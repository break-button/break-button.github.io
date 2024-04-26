import { createContext, useMemo, useState } from 'react';
import { colorMap } from '../contants';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const context = useMemo(
        () => ({
            isDarkMode,
            toggleIsDarkMode: () => setIsDarkMode((p) => !p),
            theme: colorMap[isDarkMode ? 'dark' : 'light'],
            reverseTheme: colorMap[isDarkMode ? 'light' : 'dark'],
        }),
        [isDarkMode, setIsDarkMode],
    );

    return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
