import { createContext, useContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";


interface ICurrencyContext{
    currency : string;
    setCurrency : (currency : string) => void;
}


const CurrencyContext = createContext<ICurrencyContext>({} as ICurrencyContext);

export const CurrencyProvider = ({ children }: IChildren) => {
    const [currency, setCurrency] = useState('IDR');

    const handleCurrencyChange = (newCurrency: string) => {
        setCurrency(newCurrency);
    };

    const data = {
        currency,
        setCurrency: handleCurrencyChange,
    };

    return (
        <CurrencyContext.Provider value={ data }>
            {children}
        </CurrencyContext.Provider>
    );
};

export default function useCurrency (){
    return useContext(CurrencyContext);
};