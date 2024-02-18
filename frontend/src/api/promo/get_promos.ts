import axios from "axios";

const get_promos = async () => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/promo/"
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default get_promos;
