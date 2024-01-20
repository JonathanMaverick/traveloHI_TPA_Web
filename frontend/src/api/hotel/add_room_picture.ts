import axios from "axios";
import { IRoomPicture } from "../../interfaces/hotel/room-picture-interface";

const add_room_picture = async(room : IRoomPicture) => {
    try{
        await axios.post(
            import.meta.env.VITE_API_URL + "/hotel/add_hotel_room_picture"
            , room
        );
        return 1;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default add_room_picture;