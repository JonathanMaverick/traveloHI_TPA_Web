import axios from "axios";
import { IMessage } from "../../interfaces/user/message-interface";

const send_newsletter = async(message : IMessage) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/user/send-newsletter"
            , message
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default send_newsletter;