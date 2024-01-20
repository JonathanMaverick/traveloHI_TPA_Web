import axios from "axios";
import { IHotel } from "../../interfaces/hotel/hotel-interface";

const add_hotel = async(hotel : IHotel) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/hotel/"
            , hotel
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default add_hotel;