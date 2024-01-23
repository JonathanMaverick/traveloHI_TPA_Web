import axios from "axios";

const get_airport = async() => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/airports"
        );
        return response;
    }catch(error: any){
        alert(error.response.data)
        return -1;
    }
}

export default get_airport;