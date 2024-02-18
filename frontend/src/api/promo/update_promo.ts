import axios from "axios";
import { IPromo } from "../../interfaces/promo/promo-interface";

const update_promo = async (promo : IPromo, promoID : number) => {
    try{
        const response = await axios.put(
            import.meta.env.VITE_API_URL + "/promo/" + promoID,
            promo
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default update_promo;
