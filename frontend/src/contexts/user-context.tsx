import { createContext, useContext, useEffect, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { IUser } from "../interfaces/user-interface";
import axios from "axios";
import setCookie from "../settings/set-cookie";
import authenticate from "../api/auth/auth";
import getCookie from "../settings/get_cookie";
import { IOTP } from "../interfaces/otp-interface";

interface IUserContext{
    user : IUser | null;
    login : (user : IUser) => Promise<number>; 
    loginotp : (otp : IOTP) => Promise<number>;
    logout : () => void;
}

const context = createContext<IUserContext>({} as IUserContext);

export function UserProvider({children} : IChildren){

    const user = JSON.parse(localStorage.getItem("user") || "{}").user;

    async function login(user : IUser) :  Promise<number>{
        try{
            const response =  await axios.post(
                import.meta.env.VITE_API_URL + "/user/login/"
                , user
            );
            setCookie('token', response.data.token, 1)
            localStorage.setItem("user",
                JSON.stringify({
                    user: response.data.user
                })
            )
            return 1;
        }catch(error: any){
            alert(error.response.data)
            return -1;
        }
    }

    async function loginotp(otp : IOTP) :  Promise<number>{
        try{
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/user/login-otp"
                , otp
            );        
            setCookie('token', response.data.token, 1)
            localStorage.setItem("user",
                JSON.stringify({
                    user: response.data.user
                })
            )
            return 1;
        }catch(error: any){
            alert(error.response.data)
            return -1;
        }
    }

    function logout(){
        setCookie('token', '', -1);
    }

    const data : IUserContext = {
        user,
        login,
        logout,
        loginotp
    }

    return <context.Provider value={data}>{children}</context.Provider>
}
export default function useUser(){
    return useContext(context);
}