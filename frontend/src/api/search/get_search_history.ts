import axios from "axios";

const get_search_history = async(userID : number) => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/search/history/" + userID,
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_search_history;