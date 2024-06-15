import React, { createContext, useContext, useState, ReactNode } from "react";
import { themes } from "./utils/Themes";

type ThemeContextType = {
  theme: typeof themes.default;
  setTheme: (themeName: keyof typeof themes) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.default,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState(themes.default);

  const setTheme = (themeName: keyof typeof themes) => {
    setThemeState(themes[themeName]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
