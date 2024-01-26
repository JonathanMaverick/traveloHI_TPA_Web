import axios from "axios";

const verify_recaptcha = async(recaptcha: string) => {
    try{
        await axios.post(
            import.meta.env.VITE_API_URL + "/user/verify-recaptcha/"
            , {recaptcha: recaptcha}
        );
        return 1;
    }catch(error: any){
        console.log(error.response.data)
        return -1;
    }
}

export default verify_recaptcha;