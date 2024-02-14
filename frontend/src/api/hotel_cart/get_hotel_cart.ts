import axios from "axios";

const get_hotel_cart = async(userId : string) => {
    try{
        const response = await axios.get(import.meta.env.VITE_API_URL + '/hotel-transaction/hotel-cart/user/' + userId);
        const result = response.data;
        return result;
    }catch(error: any){
        console.log(error)
        return -1;
    }
}

export default get_hotel_cart;