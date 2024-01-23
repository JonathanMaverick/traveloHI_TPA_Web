import axios from "axios";
import { IFlightSchedule } from "../../../interfaces/flight/flight-schedule-interface";

const add_flight_schedule = async(schedule : IFlightSchedule) => {
    try{
        console.log(schedule)
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/flight/schedule"
            , schedule
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_flight_schedule;