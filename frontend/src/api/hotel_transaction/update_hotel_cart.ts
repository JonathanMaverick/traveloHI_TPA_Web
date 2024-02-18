import axios from "axios";
import { IHotelCart } from "../../interfaces/hotel/hotel-cart-interface";

const update_hotel_cart = async (cart : IHotelCart, cartID : number) => {
    try{
        const response = await axios.put(
            import.meta.env.VITE_API_URL + "/hotel-transaction/hotel-cart/" + cartID,
            cart
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default update_hotel_cart;
