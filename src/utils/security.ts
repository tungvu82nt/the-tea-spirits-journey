let csrfToken: string | null = null;

const CSRF_TOKEN_KEY = 'csrf-token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';

export const getCSRFToken = (): string | null => {
  if (csrfToken) {
    return csrfToken;
  }

  const metaTag = document.querySelector(`meta[name="${CSRF_TOKEN_KEY}"]`) as HTMLMetaElement;
  if (metaTag?.content) {
    csrfToken = metaTag.content;
    return csrfToken;
  }

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${CSRF_TOKEN_KEY}=`))
    ?.split('=')[1];

  if (cookie) {
    csrfToken = decodeURIComponent(cookie);
    return csrfToken;
  }

  return null;
};

export const setCSRFToken = (token: string): void => {
  csrfToken = token;
  
  let metaTag = document.querySelector(`meta[name="${CSRF_TOKEN_KEY}"]`) as HTMLMetaElement;
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.name = CSRF_TOKEN_KEY;
    document.head.appendChild(metaTag);
  }
  metaTag.content = token;
};

export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const secureFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getCSRFToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers[CSRF_HEADER_NAME] = token;
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  const newToken = response.headers.get(CSRF_HEADER_NAME);
  if (newToken) {
    setCSRFToken(newToken);
  }

  return response;
};

export const secureFormData = (formData: FormData): FormData => {
  const token = getCSRFToken();
  if (token) {
    formData.append(CSRF_HEADER_NAME, token);
  }
  return formData;
};

export const initializeCSRFProtection = (): void => {
  const token = getCSRFToken();
  if (!token) {
    const newToken = generateCSRFToken();
    setCSRFToken(newToken);
  }
};

export const validateCSRFToken = (providedToken: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken !== null && storedToken === providedToken;
};

export const refreshCSRFToken = async (apiUrl: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/csrf-token`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        setCSRFToken(data.token);
      }
    }
  } catch (error) {
    console.error('Failed to refresh CSRF token:', error);
  }
};
