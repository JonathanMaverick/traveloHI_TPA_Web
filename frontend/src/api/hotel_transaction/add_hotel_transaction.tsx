import axios from "axios";
import { IFlightTransaction } from "../../interfaces/flight/flight-transaction-interface";

const add_hotel_transaction = async(flight_transaction : IFlightTransaction) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/hotel-transaction/"
            , flight_transaction
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_hotel_transaction;