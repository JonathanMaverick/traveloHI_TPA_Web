import axios from "axios";

const search_flight = async(query : string) => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/flight/search/" + query
        );
        return response;
    }catch(error: any){
        console.log(error)
        return -1;
    }
}

export default search_flight;