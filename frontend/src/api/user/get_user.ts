import axios from "axios";

const get_user = async() => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/user/"
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_user;