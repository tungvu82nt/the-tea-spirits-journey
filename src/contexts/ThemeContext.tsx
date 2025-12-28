import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme';

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored as Theme;
  }
  return 'system';
};

const getActualTheme = (theme: Theme): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

const applyTheme = (theme: 'light' | 'dark'): void => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  root.setAttribute('data-theme', theme);
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({ 
  children, 
  defaultTheme = 'system',
  storageKey = THEME_STORAGE_KEY 
}: ThemeProviderProps): JSX.Element => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme();
    return stored || defaultTheme;
  });
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>(() => 
    getActualTheme(getStoredTheme() || defaultTheme)
  );

  useEffect(() => {
    const stored = getStoredTheme();
    const initialTheme = stored || defaultTheme;
    setThemeState(initialTheme);
    applyTheme(getActualTheme(initialTheme));
  }, [defaultTheme]);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    const newActualTheme = getActualTheme(theme);
    setActualTheme(newActualTheme);
    applyTheme(newActualTheme);
  }, [theme, storageKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (): void => {
      if (theme === 'system') {
        const newActualTheme = getActualTheme('system');
        setActualTheme(newActualTheme);
        applyTheme(newActualTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
