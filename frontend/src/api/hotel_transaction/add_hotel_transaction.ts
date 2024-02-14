import axios from "axios";
import { IHotelTransaction } from "../../interfaces/hotel/hotel-transaction-interface";

const add_hotel_transaction = async(hotel_transaction : IHotelTransaction) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/hotel-transaction/"
            , hotel_transaction
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_hotel_transaction;