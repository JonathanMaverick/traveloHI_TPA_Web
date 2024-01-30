import axios from "axios";

const get_top_5_flight_schedule = async() => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/schedule/top-5"
        );
        return response;
    }catch(error: any){
        return -1;
    }
}

export default get_top_5_flight_schedule;