import axios from "axios";

const get_top_5_search = async() => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/search/top-search/",
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_top_5_search;