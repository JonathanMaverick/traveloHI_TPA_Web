import axios from "axios";
import { IRoom } from "../../interfaces/hotel/room-interface";

const add_hotel_room = async(room : IRoom) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/hotel/add_hotel_room"
            , room
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_hotel_room;