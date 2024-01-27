import axios from "axios";
import { ISearch } from "../../interfaces/search/search-interface";

const add_search = async(search : ISearch) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/search/"
            , search
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_search;