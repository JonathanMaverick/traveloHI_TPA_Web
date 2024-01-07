import { createContext, useContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { IUser } from "../interfaces/user-interface";

interface IUserContext{
    user : IUser | null;
    login : (name : string, password : string) => boolean; 
    logout : () => void;
}

const context = createContext<IUserContext>({} as IUserContext);

export function UserProvider({children} : IChildren){
    const [user, setUser] = useState <IUser | null>
    (localStorage.getItem('USER_KEY') ? 
    JSON.parse(localStorage.getItem('USER_KEY') as string) as IUser
    : null);

    function login(name : string, password : string) : boolean{
        if(name === 'admin' && password === 'admin'){
            const user : IUser = {
                Name : name,
                Email : '',
                ID : '',
            }
            setUser(user);
            localStorage.setItem('USER_KEY', JSON.stringify(user));
            return true;
        }
        return false;
    }

    function logout(){
        setUser(null);
        localStorage.removeItem('USER_KEY');
    }

    const data : IUserContext = {
        user,
        login,
        logout
    }

    return <context.Provider value={data}>{children}</context.Provider>
}

export default function useUser(){
    return useContext(context);
}