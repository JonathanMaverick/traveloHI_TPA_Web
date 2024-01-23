import axios from "axios";

const get_flight_schedule = async() => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/schedule"
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default get_flight_schedule;