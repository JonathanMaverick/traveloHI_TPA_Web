import { createContext, useContext, useEffect, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { IUser } from "../interfaces/user-interface";
import axios from "axios";
import setCookie from "../settings/set-cookie";
import authenticate from "../api/auth/auth";
import getCookie from "../settings/get_cookie";

interface IUserContext{
    user : IUser | null;
    login : (user : IUser) => Promise<number>; 
    logout : () => void;
}

const context = createContext<IUserContext>({} as IUserContext);

export function UserProvider({children} : IChildren){
    const [user, setUser] = useState <IUser | null>({});

    const getUser = async () => {
        const cookie = getCookie("token")
    
        const result = await authenticate({
            "token": cookie
        });

        if(result){
            setUser(result);
        }
        else{
            setUser({})
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
          await getUser();
        };
    
        fetchUserData(); 
      }, []);

    async function login(user : IUser) :  Promise<number>{
        try{
            const response =  await axios.post(
                import.meta.env.VITE_API_URL + "/user/login/"
                , user
            );
            setCookie('token', response.data, 1)
            return 1;
        }catch(error: any){
            alert(error.response.data)
            return -1;
        }
    }

    function logout(){
        setUser(null);
        setCookie('token', '', -1);
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