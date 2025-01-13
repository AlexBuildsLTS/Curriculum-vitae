import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';

interface ThemeContextProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    toggleDarkMode: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // If you want to start in dark by default, set return true below
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const stored = localStorage.getItem('theme');
        if (stored) {
            return stored === 'dark';
        }
        // Default to light:
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
