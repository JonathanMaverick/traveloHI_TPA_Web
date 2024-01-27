import axios from "axios";
import verify_recaptcha from "./verify_recaptcha";
import { IUser } from "../../interfaces/user/user-interface";

const register = async(user : IUser, captcha : string) => {
    const captcha_response = await verify_recaptcha(captcha);
    if (captcha_response == -1){
        alert('Captcha verification failed');
        return -1;
    }

    try{
        await axios.post(
            import.meta.env.VITE_API_URL + "/user/"
            , user
        );
        return 1;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default register;