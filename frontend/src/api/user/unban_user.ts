import axios from "axios";
import { IUser } from "../../interfaces/user/user-interface";

const unban_user = async(user : IUser) => {

    try{
        const response =  await axios.post(
            import.meta.env.VITE_API_URL + "/user/unban-user",
            user
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default unban_user;