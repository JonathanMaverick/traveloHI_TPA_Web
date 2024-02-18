import axios from "axios";
import { IFlightCart } from "../../../interfaces/flight/flight-cart-interface";

const add_flight_transaction_from_cart = async(flightCart : IFlightCart) => {
    try{
        const response = await axios.post(import.meta.env.VITE_API_URL + '/flight-transaction/add-flight-transaction-from-cart/', flightCart);
        const result = response.data;
        return result;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_flight_transaction_from_cart;