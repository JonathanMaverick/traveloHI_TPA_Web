import axios from "axios";
import { IOTP } from "../../interfaces/user/otp-interface";

const requestotp = async(otp : IOTP) => {

    try{
        const response =  await axios.post(
            import.meta.env.VITE_API_URL + "/user/request-otp"
            , otp
        );
        alert(response.data)
        return 1;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default requestotp;