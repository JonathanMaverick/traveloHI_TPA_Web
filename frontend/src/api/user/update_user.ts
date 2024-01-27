import axios from "axios";
import { IUser } from "../../interfaces/user-interface";

const update_user = async(userId : string, user : IUser) => {
    try{
        const response =  await axios.put(
            import.meta.env.VITE_API_URL + "/user/" + userId,
            user
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default update_user;