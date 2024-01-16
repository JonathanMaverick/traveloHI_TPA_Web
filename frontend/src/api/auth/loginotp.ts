import axios from "axios";
import { IOTP } from "../../interfaces/otp-interface";
import setCookie from "../../settings/set-cookie";

const loginotp = async(otp : IOTP) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/user/login-otp"
            , otp
        );        
        setCookie('token', response.data, 1)
        return 1;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default loginotp;