import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/hotel-card.scss"
import { IFlightSchedule } from "../../interfaces/flight/flight-schedule-interface";
import FlightSearchCard from "./flightSearchCard";
import search_flight from "../../api/hotel/search_flight";

export default function HotelSearch() {

    const { query } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trimmedQuery = query?.trim();
                const response = await search_flight(trimmedQuery || '');
                if (response == -1){
                    return;
                }
                else{
                    console.log(response.data);
                    setFlightScheduleList(response.data);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
          };
      
          fetchData();
    }, [query]);

    const [flightScheduleList, setFlightScheduleList] = useState<IFlightSchedule[]>([])

    return(
        <div className="flight-search-result">
            <h1>Flight</h1>
            <div className="flight-list">
                {flightScheduleList.map((f) => (
                    <div className="flight-card" key={f.flightScheduleID}>
                        <FlightSearchCard flightSchedule={f} />
                    </div>
                ))}
            </div>
        </div>
    )
}