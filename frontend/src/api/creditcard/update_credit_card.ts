import axios from "axios";
import { ICreditCard } from "../../interfaces/user/credit-card.interface";

const update_credit_card = async(userID : string, creditCard : ICreditCard) => {
    try{
        const response = await axios.put(import.meta.env.VITE_API_URL + '/user/credit-card/'+userID, creditCard);
        const result = response.data;
        return result;
    }catch(error: any){
        console.log(error)
        return -1;
    }
}

export default update_credit_card;