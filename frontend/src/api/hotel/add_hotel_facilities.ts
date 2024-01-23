import { IHotelFacilities } from "@interfaces/hotel/hotel-facilities-interface";
import axios from "axios";

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