import axios from "axios";

const get_plane = async() => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/plane/"
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}


export default get_plane;