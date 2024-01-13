import axios from "axios";
import { IUser } from "../../interfaces/user-interface";

const register = async(user : IUser) => {
    console.log(user)
    try{
        const response =  await axios.post(import.meta.env.VITE_API_URL + "/user/", user);
        return response;
    }catch(error){
        return -1
    }
}

export default register;