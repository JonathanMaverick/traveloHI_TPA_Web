import { useEffect, useState } from "react";
import "../../../styles/pages/manage-plane.scss";
import AddFlightSchedule from "./addFlightSchedule";
import { IFlightSchedule } from "../../../interfaces/flight/flight-schedule-interface";
import get_flight_schedule from "../../../api/flight/schedule/get_flight_schedule";
import FlightScheduleCard from "./flightScheduleCard";

export default function ManageFlightSchedule(){

    useEffect(() => {
        document.title = "Manage Flight Schedule";
        const fetchData = async () => {
            try{
                const response = await get_flight_schedule();
                if(response != -1){
                    setFlightSchedule(response.data);
                }
            }
            catch(error){
                console.error("Error fetching data:", error);
            }
          };
          fetchData();
    }
    , []);

    const [showScheduleForm, setShowScheduleForm ] = useState(false);
    const [flightSchedule, setFlightSchedule] = useState<IFlightSchedule[]>([]);
    const toggleButton = () => {
        setShowScheduleForm(!showScheduleForm);
    };

    return(
        <div>
            <div className="airline-title">
                <h1>Flight Schedule</h1>
                <button onClick={toggleButton}>Add Flight Schedule</button>
            </div>
            <div className={`add-form ${showScheduleForm ? 'open' : ''}`}>
                <AddFlightSchedule />
            </div>
            <div className={`overlay ${showScheduleForm ? 'open' : ''}`} onClick={() => setShowScheduleForm(false)}></div>
            <div className="flight-schedule-list">
                {flightSchedule.map((schedule) => (
                    <FlightScheduleCard key={schedule.flightScheduleID} flightSchedule={schedule} />
                ))}
            </div>
        </div>
    )
}
