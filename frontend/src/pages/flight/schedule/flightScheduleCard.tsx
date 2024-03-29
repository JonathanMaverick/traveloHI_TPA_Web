import { useState } from "react";
import { IFlightSchedule } from "../../../interfaces/flight/flight-schedule-interface";
import "../../../styles/pages/flight/schedule/flight_schedule_card.scss"
import useCurrency from "../../../contexts/currency-context";
import EditFlightSchedule from "./editFlightSchedule";

const FlightScheduleCard = ({ flightSchedule }: { flightSchedule: IFlightSchedule }) => {

    function formatTime (date:string) {
        const newDate = new Date(date);
        const hours = newDate.getHours().toString().padStart(2, '0');
        const minutes = newDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const formattedArrivalTime = formatTime(flightSchedule.arrivalTime);
    const formattedDepartureTime = formatTime(flightSchedule.departureTime);
    const {currency} = useCurrency();

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    function formatDate(date:string) {
      const dateObject = new Date(date);
      return dateObject.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      });
    }
    const toggleButton = () => {
      setShowScheduleForm(!showScheduleForm);
    };
    const [showScheduleForm, setShowScheduleForm ] = useState(false);

    return (
      <div className={`flight-schedule-card ${isAccordionOpen ? 'open' : ''}`} onClick={toggleAccordion}>
        <div className="flight-schedule-content">
          <div className="upper-flight-schedule-content">
            <div className="airline-logo-container">
              <img src={flightSchedule.Plane?.Airline?.airlineLogo} alt="" />
              <p>{flightSchedule.Plane?.Airline?.airlineName} - {flightSchedule.flightScheduleCode}</p>
            </div>
            <div className="flight-schedule-detail">
              <div className="flight-schedule-time">
                <div className="flight-schedule-time-detail">
                  <p>{formattedDepartureTime}</p>
                  <p className="flight-city-code">{flightSchedule.OriginAirport?.airportCode}</p>
                </div>
                  -
                <div className="flight-schedule-time-detail">
                  <p>{formattedArrivalTime}</p>
                  <p className="flight-city-code">{flightSchedule.DestinationAirport?.airportCode}</p>
                </div>
              </div>
              <div className="flight-schedule-price">
                {currency == "IDR" ? (
                  <p>Rp. {flightSchedule.economyPrice} <span className="flight-schedule-price-org">/org</span></p>
                ) : (
                  <p>$ {(flightSchedule.economyPrice / 14000).toFixed(4)} <span className="flight-schedule-price-org">/people</span></p>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-flight-schedule-content">
            <p className={`detail-flight-schedule ${isAccordionOpen ? 'accordion-open' : ''}`}>Detail</p>
            <button onClick={toggleButton}>Edit</button>
            <div className={`add-form ${showScheduleForm ? 'open' : ''}`}>
                <EditFlightSchedule f={flightSchedule}/>
            </div>
            <div className={`overlay ${showScheduleForm ? 'open' : ''}`} onClick={() => setShowScheduleForm(false)}></div>
          </div>
        </div>
        {isAccordionOpen && (
          <div className="accordion-content">
            <div className="date">
              <p>{formatDate(flightSchedule.departureTime)} - {formatDate(flightSchedule.arrivalTime)}</p>
            </div>
            <div className="airport-info">
              <p className="location">
                {flightSchedule.OriginAirport?.airportLocation} ({flightSchedule.OriginAirport?.airportCode})
              </p>
              <p className="name">{flightSchedule.OriginAirport?.airportName}</p>
            </div>

            <div className="flight-details">
              <p className="airline">{flightSchedule.Plane?.Airline?.airlineName} - {flightSchedule.Plane?.planeCode}</p>
            </div>

            <div className="airport-info">
              <p className="location">
                {flightSchedule.DestinationAirport?.airportLocation} ({flightSchedule.DestinationAirport?.airportCode})
              </p>
              <p className="name">{flightSchedule.DestinationAirport?.airportName}</p>
            </div>
          </div>
      )}
      </div>
    );
};
    
export default FlightScheduleCard;