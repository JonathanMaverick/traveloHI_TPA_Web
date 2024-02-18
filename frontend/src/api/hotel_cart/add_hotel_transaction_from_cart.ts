import axios from "axios";
import { IHotelCart } from "../../interfaces/hotel/hotel-cart-interface";

const add_hotel_transaction_from_cart = async(hotelCart : IHotelCart) => {
    try{
        const response = await axios.post(import.meta.env.VITE_API_URL + '/hotel-transaction/add-hotel-transaction-from-cart/', hotelCart);
        const result = response.data;
        return result;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_hotel_transaction_from_cart;