import axios from "axios";

const get_flight_schedule_detail = async(flightScheduleID : string) => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/schedule/" + flightScheduleID
        );
        return response;
    }catch(error: any){
        return -1;
    }
}

export default get_flight_schedule_detail;