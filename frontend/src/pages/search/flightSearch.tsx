import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/pages/hotel-card.scss"
import { IFlightSchedule } from "../../interfaces/flight/flight-schedule-interface";
import FlightSearchCard from "./flightSearchCard";
import search_flight from "../../api/hotel/search_flight";

export default function FlightSearch({sortOption}: {sortOption: string}) {

    const { query } = useParams();
    const [flightScheduleList, setFlightScheduleList] = useState<IFlightSchedule[]>([])

    const fetchData = async () => {
        try {
            const trimmedQuery = query?.trim();
            const response = await search_flight(trimmedQuery || '');
            if (response == -1){
                return;
            }
            else{
                setFlightScheduleList(response.data);
            }
        } catch (error) {
            console.error('Error fetching hotel data');
        }
    };

    useEffect(() => {      
        fetchData();
    }, [query]);

    useEffect(() => {
        const sortFlightSchedule = () => {
            if (sortOption === "price"){
                const sortedFlightSchedule = [...flightScheduleList].sort((a, b) => a.economyPrice - b.economyPrice);
                setFlightScheduleList(sortedFlightSchedule);
            }
            else if (sortOption === "duration"){
                const sortedFlightSchedule = [...flightScheduleList].sort((a, b) => {
                    const aDuration = new Date(a.arrivalTime).getTime() - new Date(a.departureTime).getTime();  
                    const bDuration = new Date(b.arrivalTime).getTime() - new Date(b.departureTime).getTime();
                    return aDuration - bDuration;
                });
                setFlightScheduleList(sortedFlightSchedule);
            }
            else{
                fetchData();
            }
        }
        sortFlightSchedule();
    }, [sortOption]);

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