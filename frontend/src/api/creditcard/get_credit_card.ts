import axios from "axios";

const get_credit_card = async(userID : string) => {
    try{
        const response = await axios.get(import.meta.env.VITE_API_URL + '/user/credit-card/'+userID);
        const result = response.data;
        return result;
    }catch(error: any){
        return -1;
    }
}

export default get_credit_card;