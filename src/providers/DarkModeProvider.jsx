import { createContext, useContext, useEffect, useState } from "react";
export const DarkModeContext = createContext(null);
export const useDarkModeContext = () => {
    const context = useContext(DarkModeContext);
    if (!context)
        throw new Error(
            "useDarkModeContext has to be used within DarkModeContext"
        );
    return context;
};
const usePrefersDarkMode = () => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode;
};

export const DarkModeProvider = (props) => {
    const [darkMode, setDarkMode] = useState(usePrefersDarkMode());

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setDarkMode(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const providerValue = {
        darkMode: darkMode,
        setDarkMode,
    };

    return (
        <DarkModeContext.Provider value={providerValue}>
            {props.children}
        </DarkModeContext.Provider>

    );

};

