import axios from "axios";

const get_user_ongoing_hotel_transaction = async(userID : number) => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/hotel-transaction/user/ongoing/" + userID,
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_user_ongoing_hotel_transaction;