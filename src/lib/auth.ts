import Cookies from 'js-cookie';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface CsrfToken {
  token: string;
  expiresAt: number;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const CSRF_TOKEN_KEY = 'csrf_token';

export const authUtils = {
  setTokens(tokens: AuthTokens): void {
    Cookies.set(ACCESS_TOKEN_KEY, tokens.accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: 1,
    });
    Cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: 7,
    });
  },

  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  clearTokens(): void {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove(CSRF_TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },

  setCsrfToken(token: string, expiresIn: number = 3600): void {
    const csrfData: CsrfToken = {
      token,
      expiresAt: Date.now() + expiresIn * 1000,
    };
    Cookies.set(CSRF_TOKEN_KEY, JSON.stringify(csrfData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },

  getCsrfToken(): string | null {
    const tokenData = Cookies.get(CSRF_TOKEN_KEY);
    if (!tokenData) return null;

    try {
      const csrf: CsrfToken = JSON.parse(tokenData);
      if (Date.now() > csrf.expiresAt) {
        this.clearCsrfToken();
        return null;
      }
      return csrf.token;
    } catch {
      return null;
    }
  },

  clearCsrfToken(): void {
    Cookies.remove(CSRF_TOKEN_KEY);
  },

  isCsrfTokenValid(): boolean {
    const token = this.getCsrfToken();
    return token !== null && token.length > 0;
  },
};

export const csrfUtils = {
  generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  validateToken(token: string): boolean {
    return typeof token === 'string' && token.length === 64;
  },

  getCsrfHeader(): Record<string, string> {
    const token = authUtils.getCsrfToken();
    return token ? { 'X-CSRF-Token': token } : {};
  },
};

export const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = authUtils.getAccessToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...csrfUtils.getCsrfHeader(),
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (response.status === 401) {
    authUtils.clearTokens();
    window.location.href = '/login';
  }

  if (response.status === 403) {
    authUtils.clearCsrfToken();
  }

  return response;
};
