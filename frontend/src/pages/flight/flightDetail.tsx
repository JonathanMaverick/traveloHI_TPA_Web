import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import get_flight_schedule_detail from "../../api/flight/schedule/get_flight_schedule_detail";
import { IFlightSchedule } from "../../interfaces/flight/flight-schedule-interface";
import { MdEventSeat } from "react-icons/md";
import "../../styles/pages/flight/schedule/flight_detail.scss";
import FlightSearchCard from "../search/flightSearchCard";
import { ISeat } from "../../interfaces/flight/seats-interface";
import useCurrency from "../../contexts/currency-context";
import "../../styles/pages/flight/schedule/flight_schedule_card.scss"
import useUser from "../../contexts/user-context";
import { IFlightTransaction } from "../../interfaces/flight/flight-transaction-interface";
import add_flight_transaction from "../../api/flight_transaction/add_flight_transaction";
import { IFlightCart } from "../../interfaces/flight/flight-cart-interface";
import add_flight_cart from "../../api/flight/cart/add_flight_cart";

export default function FlightDetail(){
    const { id } = useParams();
    const { currency } = useCurrency();
    const {user} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = `Flight Detail`;
        const fetchData = async () => {
            try{
                const response = await get_flight_schedule_detail(id!);
                if(response == -1){
                    return;
                }
                else{
                    setFlightSchedule(response.data);
                }
            }
            catch(error){
                console.error('Error fetching flight data');
            }
        }
        fetchData();
    }, []);

    const INITIAL_FLIGHT_DETAIL: IFlightSchedule = {
        flightScheduleID: 0,
        planeID: 0,
        originAirportID: 0,
        destinationAirportID: 0,
        departureTime: "",
        arrivalTime: "",
        economyPrice: 0,
        businessPrice: 0,
        flightScheduleCode: "",
    };

    function formatDate(date:string) {
        const dateObject = new Date(date);
        return dateObject.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        });
    }

    function formatTime (date:string) {
        const newDate = new Date(date);
        const hours = newDate.getHours().toString().padStart(2, '0');
        const minutes = newDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };
  
    const timeDifferenceMs = (arrivalTime : string, departureTime : string) => {
        const arrival = new Date(arrivalTime);
        const departure = new Date(departureTime);
        const timeDifference = arrival.getTime() - departure.getTime();

        const hours = Math.floor(timeDifference / 3600000);
        const minutes = Math.floor((timeDifference % 3600000) / 60000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    const [flightSchedule, setFlightSchedule] = useState<IFlightSchedule>(INITIAL_FLIGHT_DETAIL) 
    const [selectedSeats, setSelectedSeats] = useState<ISeat[]>([]);
    const [paymentForm, setPaymentForm] = useState(false);
    const [paymentOption, setPaymentOption] = useState("hi-wallet"); 
    const [addOnLuggage, setAddOnLuggage] = useState(false);

    const handleAddOnLuggageChange = () => {
        setAddOnLuggage(!addOnLuggage);
    };

    const chunkSeats = (seats: ISeat[], chunkSize: number) => {
        const result = [];
        let currentRow: ISeat[] = [];
      
        for (let i = 0; i < seats.length; i++) {
          const seat = seats[i];
          if (currentRow.length === 0) {
            currentRow.push(seat);
          } else {
            if (seat.seatType === currentRow[0].seatType) {
              currentRow.push(seat);
            } else {
              result.push(currentRow);
              currentRow = [seat];
            }
          }
          if (currentRow.length === chunkSize || i === seats.length - 1) {
            result.push(currentRow);
            currentRow = [];
          }
        }
      
        return result;
    };
      

    function SeatMap({ seats }: {seats : ISeat[]}) {
        const sortedSeats = seats.slice().sort((a, b) => (a.seatID ?? 0) - (b.seatID ?? 0));
        const seatsInRows = chunkSeats(sortedSeats, 6);
        return (
            <div>
                <div className="seat-map">
                    <h2>Seat Map</h2>
                    <div className="seat-color">
                        <div className="seat-color-information">
                            <div className="business-box box"></div>
                            <p>Business</p>
                        </div>
                        <div className="seat-color-information">
                            <div className="economy-box box"></div>
                            <p>Economy</p>
                        </div>
                        <div className="seat-color-information">
                            <div className="unavailable-box box"></div>
                            <p>Unavailable</p>
                        </div>
                    </div>
                    {seatsInRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="seat-row">
                        <div className="left-seats">
                            {row.slice(0, 3).map((seat) => (
                            <div
                                key={seat.seatID}
                                className={`available ${seat.seatType} ${seat.seatStatus === 'available' ? '' : 'unavailable'} ${selectedSeats.some(selectedSeat => selectedSeat.seatID === seat.seatID) ? 'selected' : ''}`}
                                onClick={() => {
                                    if (seat.seatStatus === 'available') {
                                        const isSeatSelected = selectedSeats.some(selectedSeat => selectedSeat.seatID === seat.seatID);
                                        if (isSeatSelected) {
                                            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat.seatID !== seat.seatID));
                                        } else {
                                            setSelectedSeats([...selectedSeats, seat]);
                                        }
                                    }
                                }}
                            >
                                <MdEventSeat size={30} className={seat.seatType} />
                            </div>
                            ))}
                        </div>
                        <div className="right-seats">
                            {row.slice(3).map((seat) => (
                            <div
                                key={seat.seatID}
                                className={`available ${seat.seatType} ${seat.seatStatus === 'available' ? '' : 'unavailable'} ${selectedSeats.some(selectedSeat => selectedSeat.seatID === seat.seatID) ? 'selected' : ''}`}
                                onClick={() => {
                                    if (seat.seatStatus === 'available') {
                                        const isSeatSelected = selectedSeats.some(selectedSeat => selectedSeat.seatID === seat.seatID);
                                        if (isSeatSelected) {
                                            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat.seatID !== seat.seatID));
                                        } else {
                                            setSelectedSeats([...selectedSeats, seat]);
                                        }
                                    }
                                }}
                            >
                                <MdEventSeat size={30} className={seat.seatType} />
                            </div>
                            ))}
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if(flightSchedule == INITIAL_FLIGHT_DETAIL){
        return (<h1>Flight not found</h1>);
    } 

    const toggleButton = () => {
        setPaymentForm(!paymentForm);
    };

    const addToCart = async () => {
        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }
    
        for (const selectedSeat of selectedSeats) {
            const seatPrice = selectedSeat.seatType === "business" ? flightSchedule.businessPrice : flightSchedule.economyPrice;
    
            const flight_cart: IFlightCart = {
                flightScheduleID: flightSchedule.flightScheduleID,
                seatID: selectedSeat.seatID,
                userID: user?.userID,
                price: seatPrice,
            };
    
            const response = await add_flight_cart(flight_cart);
            if (response == -1) {
                return;
            }
        }
    
        alert("Added to cart");
        window.location.reload();
        window.location.href = "/";
    }

    const payButton = async () => {
        if(!user){
            alert("Please login first");
            navigate("/login");
            return;
        }
        for (const selectedSeat of selectedSeats) {
            const seatPrice = selectedSeat.seatType === "business" ? flightSchedule.businessPrice : flightSchedule.economyPrice;
            const paymentId = paymentOption === "hi-wallet" ? 2 : 1;
            const flight_transaction: IFlightTransaction = {
                flightScheduleID: flightSchedule.flightScheduleID,
                seatID: selectedSeat.seatID,
                userID: user?.userID,
                paymentID: paymentId, 
                price: seatPrice,
                addOnLuggage: addOnLuggage,
            };
            const response = await add_flight_transaction(flight_transaction);
            if (response == -1) {
                return;
            }
        }
        alert("Payment Success");
        window.location.reload();
        window.location.href = "/";
            
    }

    return (
        <div>
            <FlightSearchCard flightSchedule={flightSchedule} status={"detail"} />
            <div className="seat-information">
                {flightSchedule.Seats && flightSchedule.Seats.length > 0 && (
                    <SeatMap seats={flightSchedule.Seats} />
                )}
                <div className="seat-selected-information">
                    <h2>Flight Information</h2>
                    <div className="flight-schedule-content">
                        <div className="airline-logo-container">
                            <img src={flightSchedule.Plane?.Airline?.airlineLogo} alt="Airline Logo" />
                            <p className="airline-name">{flightSchedule.Plane?.Airline?.airlineName} - {flightSchedule.Plane?.planeCode}</p>
                            <p className="airline-name">Duration: {timeDifferenceMs(flightSchedule.arrivalTime, flightSchedule.departureTime)}</p>
                        </div>
                        <div className="flight-schedule-details">
                            <div className="flight-schedule-location">
                                <p className="departure-date">{formatDate(flightSchedule.departureTime)} - {formatDate(flightSchedule.arrivalTime)}</p>
                                <p className="route">{flightSchedule.OriginAirport?.airportLocation} - {flightSchedule.DestinationAirport?.airportLocation}</p>
                            </div>
                            <div className="flight-schedule-time">
                                <p className="flight-time">{formatTime(flightSchedule.departureTime)} - {formatTime(flightSchedule.arrivalTime)}</p>
                            </div>
                        </div>
                    </div>
                    {selectedSeats.length > 0 && (
                        <>
                        <div>
                            <div className="seat-information-detail">
                            {selectedSeats.map(selectedSeat => (
                                <p key={selectedSeat.seatID}>{selectedSeat.seatNumber}</p>
                            ))}
                            </div>
                        </div>
                        <div className="transaction-detail-price">
                            {selectedSeats.length > 0 && (
                            <div className="total-price">
                                <p>Total Price:</p>
                                <div className="price">
                                    {currency === "IDR" ? "Rp." : "$"}
                                    {currency === "IDR" ? (selectedSeats.reduce((totalPrice, selectedSeat) => {
                                        const seatPrice = selectedSeat.seatType === "business" ? flightSchedule.businessPrice : flightSchedule.economyPrice;
                                        return totalPrice + seatPrice;
                                    }, 0)) : (selectedSeats.reduce((totalPrice, selectedSeat) => {
                                        const seatPrice = selectedSeat.seatType === "business" ? flightSchedule.businessPrice : flightSchedule.economyPrice;
                                        return ((totalPrice + seatPrice));
                                    }, 0) / 14000).toFixed(4)} 
                                    <span className="flight-schedule-price-org">{currency === "IDR" ? "/org" : "/person"}</span>
                                </div>
                            </div>
                            )}
                            <div className="button-container">
                                <button className="add-to-cart-button" onClick={addToCart}>
                                    Add to Cart
                                </button>
                                <button className="payment-button" onClick={toggleButton}>
                                    Continue to payment
                                </button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
            <div className={`payment-form ${paymentForm ? 'open' : ''}`}>
                <h1>Payment</h1>
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
                <div className="form-payment-price">
                    {selectedSeats.length > 0 && (
                        <>
                        <div className="total-price">
                            <p>Total Price:</p>
                            <div className="price">
                                {currency === "IDR" ? "Rp." : "$"}
                                {currency === "IDR" ? (selectedSeats.reduce((totalPrice, selectedSeat) => {
                                    const seatPrice = selectedSeat.seatType === "business" ? flightSchedule.businessPrice : flightSchedule.economyPrice;
                                    return totalPrice + seatPrice;
                                }, 0) + (addOnLuggage ? 10000 : 0)) : (selectedSeats.reduce((totalPrice, selectedSeat) => {
                                    const seatPrice = selectedSeat.seatType === "business" ? flightSchedule.businessPrice : flightSchedule.economyPrice;
                                    return (totalPrice + seatPrice) / 14000;
                                }, 0) + (addOnLuggage ? (10000 / 14000) : 0)).toFixed(4)} 
                                <span className="flight-schedule-price-org">{currency === "IDR" ? "/org" : "/person"}</span>
                            </div>
                        </div>
                        </>
                    )}
                    <button onClick={() => payButton()}>
                        Pay
                    </button>
                </div>
            </div>
            <div className={`overlay ${paymentForm ? 'open' : ''}`} onClick={() => setPaymentForm(false)}></div>
        </div>
    );
}