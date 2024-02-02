import { useState } from "react";
import { IFlightTransaction } from "../../interfaces/flight/flight-transaction-interface";
import useCurrency from "../../contexts/currency-context";

export default function FlightTransactionCard({ft} : {ft : IFlightTransaction}) {

    const formatTime = (date:string) => {
        const newDate = new Date(date);
        const hours = newDate.getHours().toString().padStart(2, '0');
        const minutes = newDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
    
    function formatDate(date:string) {
      const dateObject = new Date(date);
      return dateObject.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
      });
    }

    const {currency} = useCurrency();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const formattedArrivalTime = formatTime(ft?.FlightSchedule?.arrivalTime || '');
    const formattedDepartureTime = formatTime(ft?.FlightSchedule?.departureTime || '');

    const toggleAccordion = () => {
      setIsAccordionOpen(!isAccordionOpen);
    };

    return (
      <div className={`flight-schedule-card ${isAccordionOpen ? 'open' : ''}`} onClick={toggleAccordion}>
        <div className="flight-schedule-content">
          <div className="upper-flight-schedule-content">
            <div className="airline-logo-container">
              <img src={ft.FlightSchedule?.Plane?.Airline?.airlineLogo} alt="" />
              <p>{ft.FlightSchedule?.Plane?.Airline?.airlineName} - {ft.FlightSchedule?.flightScheduleCode}</p>
            </div>
            <div className="flight-schedule-detail">
                <div className="flight-schedule-time">
                  <div className="flight-schedule-time-detail">
                    <p>{formattedDepartureTime}</p>
                    <p className="flight-city-code">{ft.FlightSchedule?.OriginAirport?.airportCode}</p>
                  </div>
                    -
                  <div className="flight-schedule-time-detail">
                    <p>{formattedArrivalTime}</p>
                    <p className="flight-city-code">{ft.FlightSchedule?.DestinationAirport?.airportCode}</p>
                  </div>
                </div>
                <div className="flight-schedule-price">
                      {currency == "IDR" ? (
                        <p>Rp. {ft?.price} <span className="flight-schedule-price-org">/org</span></p>
                      ) : (
                        <p>$ {(ft.price / 14000).toFixed(4)} <span className="flight-schedule-price-org">/people</span></p>
                      )}
                  <p>Seat : {ft.Seat?.seatNumber}</p>                
                </div>
            </div>
          </div>
        </div>
        {isAccordionOpen && (
          <div className="accordion-content">
            <div className="date">
              <p>{formatDate(ft.FlightSchedule?.departureTime || '')} - {formatDate(ft.FlightSchedule?.arrivalTime || '')}</p>
            </div>
            <div className="airport-info">
              <p className="location">
                {ft.FlightSchedule?.OriginAirport?.airportLocation} ({ft.FlightSchedule?.OriginAirport?.airportCode})
              </p>
              <p className="name">{ft.FlightSchedule?.OriginAirport?.airportName}</p>
            </div>

            <div className="flight-details">
              <p className="airline">{ft.FlightSchedule?.Plane?.Airline?.airlineName} - {ft.FlightSchedule?.Plane?.planeCode}</p>
            </div>

            <div className="airport-info">
              <p className="location">
                {ft.FlightSchedule?.DestinationAirport?.airportLocation} ({ft.FlightSchedule?.DestinationAirport?.airportCode})
              </p>
              <p className="name">{ft.FlightSchedule?.DestinationAirport?.airportName}</p>
            </div>
          </div>
      )}
      </div>
    );
}