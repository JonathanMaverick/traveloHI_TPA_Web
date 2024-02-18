import { useState } from "react";
import { IFlightCart } from "../../../interfaces/flight/flight-cart-interface";
import useCurrency from "../../../contexts/currency-context";
import TextField from "../../../component/text-field";
import Button from "../../../component/button";
import add_flight_transaction_from_cart from "../../../api/flight/cart/add_flight_transaction_from_cart";

export default function FlightCartTransactionCard({ft, isExpired} : {ft : IFlightCart, isExpired : boolean}) {

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

    const [checkOut, setCheckOut] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const paymentId = paymentOption === "hi-wallet" ? 2 : 1;
      const flight_cart = {
          ...ft,
          addOnLuggage: addOnLuggage,
          paymentID: paymentId,
          promoCode: promoCode,
          price : ft.price + (addOnLuggage ? 10000 : 0)
      };
      const response = await add_flight_transaction_from_cart(flight_cart);
      if(response != -1){
          alert("Flight Transaction Success");
          window.location.reload();
      }
      else{
          return;
      }
    };
    const [promoCode, setPromoCode] = useState("");
    const [paymentOption, setPaymentOption] = useState("hi-wallet");
    const [addOnLuggage, setAddOnLuggage] = useState(false);
    const handleAddOnLuggageChange = () => {
      setAddOnLuggage(!addOnLuggage);
    };


    return (
      <>
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
                        <p>Rp. {ft?.price}</p>
                      ) : (
                        <p>$ {(ft.price / 14000).toFixed(4)} <span className="flight-schedule-price-org">/people</span></p>
                      )}
                  <p>Seat : {ft.Seat?.seatNumber}</p>                
                </div>
            </div>
          </div>
        </div>
        {isExpired && (
            <div className="expired-overlay" style={{ color: 'red', fontWeight: 'bold' }}>
                <p>Expired</p>
            </div>
        )}
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
        {!isExpired&&(
          <div className="check-out-button">
            <button onClick={() => setCheckOut(!checkOut)}>Check Out</button>
          </div>
        )}
      </div>
        <div className={`overlay ${checkOut ? 'open' : ''}`} onClick={() => setCheckOut(false)}></div>
        <div className={`check-out-form ${checkOut ? 'open' : ''}`}>
            <h2>Check Out</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="text-field">
                <label htmlFor="flight-payment">Payment Method</label>
                <select
                    id="flight-payment"
                    name="flight-payment"
                    value={paymentOption}
                    onChange={(e) => setPaymentOption(e.target.value)}              
                >
                    <option value="hi-wallet">HI-Wallet</option>
                    <option value="credit-card">Credit-Card</option>
                </select>
                <TextField
                name="promo-code"
                    type="text"
                    label="Promo Code"
                    placeholder="Enter promo code here"
                    value={promoCode}
                    onChange={(e:string) => setPromoCode(e)}
                />
                </div>
                <div className="addon-luggage-container">
                    <label>
                    <input
                        type="checkbox"
                        checked={addOnLuggage}
                        onChange={handleAddOnLuggageChange}
                    />
                        {currency === "IDR" ? "Add On Luggage + Rp.10000" : "Add On Luggage + $" + (10000 / 14000).toFixed(4)}
                    </label>
                </div>
                {currency === "IDR" ? (
                  <p>Rp. {ft?.price + (addOnLuggage ? 10000 : 0)}</p>
                ) : (
                  <p>$ {(ft.price / 14000 + (addOnLuggage ? 10000 / 14000 : 0) ).toFixed(4)} <span className="flight-schedule-price-org"></span></p>
                )}
            <Button content="Check Out" />
            </form>
        </div>
        </>
    );
}