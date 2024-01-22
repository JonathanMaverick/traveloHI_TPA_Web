import axios from "axios";

const get_airline = async() => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/airline"
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default get_airline;