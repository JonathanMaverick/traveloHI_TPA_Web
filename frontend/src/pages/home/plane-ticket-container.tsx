import { useEffect, useState } from "react"
import { IFlightSchedule } from "../../interfaces/flight/flight-schedule-interface"
import get_top_5_flight_schedule from "../../api/flight/schedule/get_top_5_flight_schedule";
import FlightSearchCard from "../search/flightSearchCard";

export default function PlaneContainer(){
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await get_top_5_flight_schedule();
              if(response != -1){
                setFlightSchedule(response.data);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [])

    const [flightSchedule, setFlightSchedule] = useState<IFlightSchedule[]>([])

    return(
        <div>
            {flightSchedule.length > 0 ? (
                <div>
                <h2>Top 5 Flight Schedules</h2>
                    {flightSchedule.map(schedule => (
                        <FlightSearchCard key={schedule.flightScheduleID} flightSchedule={schedule} status="search" />
                    ))}
                </div>
            ) : (
                <p>No flight schedules available.</p>
            )}
        </div>
    )
}