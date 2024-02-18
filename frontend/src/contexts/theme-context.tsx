import { createContext, useContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";


interface IThemeContext{
    theme : string;
    setTheme : (currency : string) => void;
}


const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider = ({ children }: IChildren) => {
    const [theme, setTheme] = useState('light');

    const handleThemeChange = (newCurrency: string) => {
        setTheme(newCurrency);
    };

    const data = {
        theme,
        setTheme: handleThemeChange,
    };

    return (
        <ThemeContext.Provider value={ data }>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme (){
    return useContext(ThemeContext);
};