import axios from "axios";

const authenticate = async(token : object) => {
    try{
        const response = await axios.post(import.meta.env.VITE_API_URL + '/user/authenticate/', token);
        const result = response.data;
        return result;
    }catch(error: any){
        return -1;
    }
}

export default authenticate;