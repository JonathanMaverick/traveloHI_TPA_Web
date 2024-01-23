import { IFlightSchedule } from "../../../interfaces/flight/flight-schedule-interface";

const FlightScheduleCard = ({ flightSchedule }: { flightSchedule: IFlightSchedule }) => {
    const formattedArrivalTime = new Date(flightSchedule.arrivalTime).toLocaleString();
    const formattedDepartureTime = new Date(flightSchedule.departureTime).toLocaleString();

    return (
      <div className="flight-schedule-card">
        <h2>Flight Schedule #{flightSchedule.flightScheduleID}</h2>
        <p>Plane ID: {flightSchedule.planeID}</p>
        <p>Origin Airport ID: {flightSchedule.originAirportID}</p>
        <p>Destination Airport ID: {flightSchedule.destinationAirportID}</p>
        <p>Business Price: {flightSchedule.businessPrice}</p>
        <p>Economy Price: {flightSchedule.economyPrice}</p>
        <p>Arrival Time: {formattedArrivalTime}</p>
        <p>Departure Time: {formattedDepartureTime}</p>
      </div>
    );
};
    
export default FlightScheduleCard;