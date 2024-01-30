import axios from "axios";

const get_flight_cart = async(userId : string) => {
    try{
        const response = await axios.get(import.meta.env.VITE_API_URL + '/flight-transaction/flight-cart/' + userId);
        const result = response.data;
        return result;
    }catch(error: any){
        console.log(error)
        return -1;
    }
}

export default get_flight_cart;