import axios from "axios";
import { IHotelPicture } from "../../interfaces/hotel/hotel-picture-interface";

const add_hotel_picture = async(hotel : IHotelPicture) => {
    try{
        await axios.post(
            import.meta.env.VITE_API_URL + "/hotel/add_hotel_picture"
            , hotel
        );
        return 1;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default add_hotel_picture;