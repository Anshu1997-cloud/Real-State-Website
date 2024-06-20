import React, { createContext, useContext, useState } from "react";
import { lightTheme, darkTheme, ThemeMode } from "./theme";

interface ThemeContextType {
  theme: any; 
  toggleTheme: () => void;
  themeMode: ThemeMode; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<any>(lightTheme);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light"); 

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    setCurrentTheme(newThemeMode === "light" ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};