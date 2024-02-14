import axios from "axios";

const get_user_flight_transaction = async(userID : number) => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/flight-transaction/user/" + userID,
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_user_flight_transaction;