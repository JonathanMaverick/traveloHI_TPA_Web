import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import setCookie from "../settings/set-cookie";
import authenticate from "../api/auth/auth";
import getCookie from "../settings/get_cookie";
import { IChildren } from "../interfaces/children-interface";
import verify_recaptcha from "../api/auth/verify_recaptcha";
import { IUser } from "../interfaces/user/user-interface";
import { IOTP } from "../interfaces/user/otp-interface";

interface IUserContext{
    user : IUser | null;
    login : (user : IUser, captchaValue : string) => Promise<number>; 
    loginotp : (otp : IOTP) => Promise<number>;
    logout : () => void;
}

const context = createContext<IUserContext>({} as IUserContext);

export function UserProvider({children} : IChildren){
    
    const [user, setUser] = useState<IUser | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const validate = async () => {
        const cookie = getCookie("token");
    
        const result = await authenticate({
            token: cookie,
        });
    
        if (result == -1) {
            setUser(null);
            localStorage.removeItem("user");
        }
        else{
            localStorage.setItem(
                "user",
                JSON.stringify(
                    result,
                )
            );
            setUser(result);
        }
    };

    useEffect(() => {
        validate();
    }, []);


    async function login(user : IUser, captchaValue : string) :  Promise<number>{
        try{
            const captcha_response = await verify_recaptcha(captchaValue);
            if (captcha_response == -1){
                alert('Captcha verification failed');
                return -1;
            }

            const response =  await axios.post(
                import.meta.env.VITE_API_URL + "/user/login/"
                , user
            );
            localStorage.setItem("user",
                JSON.stringify(
                    response.data.user
                )
            )
            setCookie('token', response.data.token, 1)
            setUser(response.data.user)
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
            localStorage.setItem("user",
            JSON.stringify(
                    response.data.user
                )
            )
            setCookie('token', response.data.token, 1)
            setUser(response.data.user)
            return 1;
        }catch(error: any){
            alert(error.response.data)
            return -1;
        }
    }

    function logout(){
        localStorage.removeItem("user");
        setCookie('token', '', -1);
        window.location.reload();
        console.log('Navigating to login page');
        window.location.href = '/login';
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