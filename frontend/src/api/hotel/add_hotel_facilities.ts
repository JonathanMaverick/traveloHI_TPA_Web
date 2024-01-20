import axios from "axios";
import { IHotelFacilities } from "../../interfaces/hotel/hotel-facilities-interface";

const add_hotel_facilities = async(hotelFacilities : IHotelFacilities) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/hotel/add_hotel_facilities"
            , hotelFacilities
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default add_hotel_facilities;