import axios from "axios";
import { IPromo } from "../../interfaces/promo/promo-interface";

const add_promo = async(promo : IPromo) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/promo/"
            , promo
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}
export default add_promo;