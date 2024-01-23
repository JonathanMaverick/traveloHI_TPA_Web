import axios from "axios";
import { IAirline } from "../../../interfaces/flight/airline-interface";

const add_airline = async(airline : IAirline) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/flight/airline"
            , airline
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default add_airline;