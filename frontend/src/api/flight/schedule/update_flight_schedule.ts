import axios from "axios";
import { IFlightSchedule } from "../../../interfaces/flight/flight-schedule-interface";

const update_flight_schedule = async(schedule : IFlightSchedule) => {
    try{
        console.log(schedule)
        const response = await axios.put(
            import.meta.env.VITE_API_URL + "/flight/schedule"
            , schedule
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default update_flight_schedule;