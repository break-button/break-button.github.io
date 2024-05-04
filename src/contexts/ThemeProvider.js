import { createContext, useEffect, useMemo, useState } from 'react';
import { colorMap } from '../contants';
import { getItem, setItem } from '../storage';

export const ThemeContext = createContext();

const KEY = '@dopamine-detox/is-dark-mode';
const DEFAULT_VALUE = false;

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(DEFAULT_VALUE);

    useEffect(() => {
        const fetchIsDarkMode = async () => {
            const isDarkMode = await getItem(KEY);
            setIsDarkMode(isDarkMode);
        };

        fetchIsDarkMode();
    }, []);

    const toggleIsDarkMode = async () => {
        const reverseMode = !isDarkMode;
        await setItem(KEY, reverseMode);
        setIsDarkMode(reverseMode);
    }

    const context = useMemo(
        () => ({
            isDarkMode,
            toggleIsDarkMode,
            theme: colorMap[isDarkMode ? 'dark' : 'light'],
            reverseTheme: colorMap[isDarkMode ? 'light' : 'dark'],
        }),
        [isDarkMode, setIsDarkMode],
    );

    return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
