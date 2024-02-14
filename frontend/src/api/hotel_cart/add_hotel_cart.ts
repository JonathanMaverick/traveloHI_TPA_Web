import axios from "axios";
import { IHotelCart } from "../../interfaces/hotel/hotel-cart-interface";

const add_hotel_cart = async(hotel_cart : IHotelCart) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/hotel-transaction/hotel-cart"
            , hotel_cart
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_hotel_cart;