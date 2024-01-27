import { useState } from "react";
import "../../styles/pages/flight/schedule/flight_schedule_card.scss"
import useCurrency from "../../contexts/currency-context";
import { IFlightSchedule } from "../../interfaces/flight/flight-schedule-interface";

const FlightSearchCard = ({ flightSchedule }: { flightSchedule: IFlightSchedule }) => {

    const formatTime = (date:string) => {
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

    return (
      <div className={`flight-schedule-card ${isAccordionOpen ? 'open' : ''}`} onClick={toggleAccordion}>
        <div className="flight-schedule-content">
          <div className="upper-flight-schedule-content">
            <div className="airline-logo-container">
              <img src={flightSchedule.Plane?.Airline?.airlineLogo} alt="" />
              <p>{flightSchedule.Plane?.Airline?.airlineName}</p>
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
            <button>Edit</button>
          </div>
        </div>
        {isAccordionOpen && (
          <div className="accordion-content">
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
    
export default FlightSearchCard;