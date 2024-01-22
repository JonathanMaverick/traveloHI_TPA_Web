import axios from "axios";
import { IPlane } from "../../interfaces/flight/plane-interface";

const add_plane = async(plane : IPlane) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/flight/plane"
            , plane
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_plane;