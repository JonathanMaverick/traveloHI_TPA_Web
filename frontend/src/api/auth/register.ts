import axios from "axios";
import { IUser } from "../../interfaces/user-interface";

const register = async(user : IUser) => {
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