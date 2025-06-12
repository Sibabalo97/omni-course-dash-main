import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

/**
 * Represents the structure of the Theme context value.
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Creates a context to store theme data and provide a toggle function.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom hook to access the current theme and toggle function.
 * 
 * @returns {ThemeContextType} The current theme and toggle function.
 * @throws Will throw an error if used outside of ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provides theme state and toggle functionality to its children.
 * Saves the theme preference to localStorage and applies the theme to the root element.
 *
 * @param {ThemeProviderProps} props - The children to render inside the provider.
 * @returns {JSX.Element} The ThemeContext provider wrapping the children.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * Toggles the current theme between 'light' and 'dark'.
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
