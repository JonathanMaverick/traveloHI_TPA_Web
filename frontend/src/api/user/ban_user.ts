import axios from "axios";
import { IUser } from "../../interfaces/user-interface";

const ban_user = async(user : IUser) => {

    try{
        const response =  await axios.post(
            import.meta.env.VITE_API_URL + "/user/ban-user",
            user
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default ban_user;