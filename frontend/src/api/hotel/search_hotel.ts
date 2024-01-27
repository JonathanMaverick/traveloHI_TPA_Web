import axios from "axios";

const search_hotel = async(query : string) => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/hotel/search/" + query
        );
        return response;
    }catch(error: any){
        console.log(error)
        return -1;
    }
}

export default search_hotel;