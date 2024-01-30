import axios from "axios";
import { IFlightCart } from "../../../interfaces/flight/flight-cart-interface";

const add_flight_cart = async(flightCart : IFlightCart) => {
    try{
        const response = await axios.post(import.meta.env.VITE_API_URL + '/flight-transaction/flight-cart/', flightCart);
        const result = response.data;
        return result;
    }catch(error: any){
        console.log(error)
        return -1;
    }
}

export default add_flight_cart;