import Button from "../../../component/button";
import { FormEvent, useEffect, useState } from "react";
import { IFlightSchedule } from "../../../interfaces/flight/flight-schedule-interface";
import get_plane from "../../../api/flight/plane/get_plane";
import { IPlane } from "../../../interfaces/flight/plane-interface";
import get_airport from "../../../api/flight/airport/get_airport";
import { IAirport } from "../../../interfaces/flight/airport-interface";

export default function AddFlightSchedule(){

    useEffect(() => {
        document.title = "Add Flight Schedule";
        const fetchData = async () => {
            try {
              const response = await get_plane();
              if(response != -1){
                setPlane(response.data.planes);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }

            try{
              const response = await get_airport();
              if(response != -1){
                setAirport(response.data);
              }
            } catch(error){
              console.error("Error fetching data:", error);
            }
          };
        fetchData();
    }
    , []);

    const INITIAL_FLIGHT_DETAIL : IFlightSchedule = {
        flightScheduleID : 0,
        planeID : 0,
        originAirportID : 0,
        destinationAirportID : 0,
        departureTime : "",
        arrivalTime : "",
        economySeatsPrice : 0,
        businessSeatsPrice : 0,
    }
    
    const[plane, setPlane] = useState<IPlane[]>([]);
    const [airport, setAirport] = useState<IAirport[]>([]);
    const [selectedPlaneID, setSelectedPlaneID] = useState<string>("");
    const [selectedOriginAirportID, setSelectedOriginAirportID] = useState<string>("");
    const [selectedDestinationAirportID, setSelectedDestinationAirportID] = useState<string>("");
    const [flightSchedule, setFlightSchedule] = useState<IFlightSchedule>(INITIAL_FLIGHT_DETAIL);

    const handleAddSchedule = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(selectedPlaneID);
        // window.location.reload();
    }

    return(
        <form className="airline-form" onSubmit={handleAddSchedule}>
            <h2>Add Flight Schedule</h2>
            <div className="text-field">
              <label htmlFor="plane">Select Plane:</label>
              <select
                id="plane"
                value={selectedPlaneID}
                onChange={(e) => setSelectedPlaneID(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a plane
                </option>
                {plane.map((p) => (
                  <option key={p.planeID} value={p.planeID}>
                    {p.planeCode}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-field">
              <label htmlFor="originAirport">Origin Airport:</label>
              <select
                id="originAirport"
                value={selectedOriginAirportID}
                onChange={(e) => setSelectedOriginAirportID(e.target.value)}
                required
              >
                <option value="" hidden>
                  Select an origin airport
                </option>
                {airport.map((p) => (
                  <option key={p.airportID} value={p.airportID}>
                    {p.airportCode} - {p.airportName} - {p.airportLocation}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-field">
              <label htmlFor="originAirport">Destination Airport:</label>
              <select
                id="originAirport"
                value={selectedDestinationAirportID}
                onChange={(e) => setSelectedDestinationAirportID(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a destination airport
                </option>
                {airport.map((p) => (
                  <option key={p.airportID} value={p.airportID}>
                    {p.airportCode} - {p.airportName} - {p.airportLocation}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-field">
              <label htmlFor="">Departure Time</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={flightSchedule.departureTime}
                onChange={(e: any) => {
                  setFlightSchedule({
                    ...flightSchedule,
                    departureTime: e.target.value,
                  });
                }}
              />
            </div>
            <div className="text-field">
              <label htmlFor="">Arrival Time</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={flightSchedule.arrivalTime}
                onChange={(e: any) => {
                  setFlightSchedule({
                    ...flightSchedule,
                    arrivalTime: e.target.value,
                  });
                }}
              />
            </div>
            <Button content="Add Flight Schedule"/>
        </form>
    )
}