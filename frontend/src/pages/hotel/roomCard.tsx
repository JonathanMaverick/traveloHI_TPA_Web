import { IoPeopleOutline } from "react-icons/io5";
import useCurrency from "../../contexts/currency-context";
import { IRoom } from "../../interfaces/hotel/room-interface";
import "../../styles/pages/hotel-card.scss";
import { FormEvent, useEffect, useState } from "react";
import Button from "../../component/button";
import useUser from "../../contexts/user-context";
import { useNavigate } from "react-router-dom";
import add_hotel_transaction from "../../api/hotel_transaction/add_hotel_transaction";
import { IHotelTransaction } from "../../interfaces/hotel/hotel-transaction-interface";
import { IHotelCart } from "../../interfaces/hotel/hotel-cart-interface";

const RoomCard = ({ room }: { room: IRoom }) => {
  const defaultImageUrl =
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

    const {currency} = useCurrency();
    const [paymentOption, setPaymentOption] = useState("hi-wallet");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [checkInCartDate, setCheckInCartDate] = useState("");
    const [checkOutCartDate, setCheckOutCartDate] = useState("");
    const [totalprice, setTotalPrice] = useState(0);

    const {user} = useUser();
    const navigate = useNavigate();

    const submitForm = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user){
            alert("Please login first");
            navigate("/login");
        }
        const paymentID = (paymentOption == "hi-wallet") ? 2 : 1;
        const hotelTransaction : IHotelTransaction = {
            hotelID : room.hotelID,
            roomID : room.roomID,
            userID : user?.userID || 0,
            price : totalprice,
            checkInDate : checkInDate,
            checkOutDate : checkOutDate,
            paymentID : paymentID,
            isReviewed : false,
        }
        const response = await add_hotel_transaction(hotelTransaction);
        if(response != -1){
            alert("Hotel Transaction Success");
            window.location.reload();
            window.location.href = "/";
        }
        else{
            return;
        }
    }

    const submitCartForm = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!user){
            alert("Please login first");
            navigate("/login");
        }
        const hotelCart : IHotelCart = {
            id : 0,
            hotelID : room.hotelID,
            roomID : room.roomID || 0,
            userID : user?.userID || 0,
            price : totalprice,
            checkInDate : checkInCartDate,
            checkOutDate : checkOutCartDate,
        }
    }

    useEffect(() => {
        calculateTotalPrice(checkInDate, checkOutDate);
    }, [checkInDate, checkOutDate]);

    useEffect(() => {
        calculateTotalPrice(checkInCartDate, checkOutCartDate);
    }, [checkInCartDate, checkOutCartDate]);

    const handleCheckInDateChange = (e:any) => {
        setCheckInDate(e.target.value);
    };
    
    const handleCheckOutDateChange = (e:any) => {
        setCheckOutDate(e.target.value);
    };

    const handleCheckInCartDateChange = (e:any) => {
        setCheckInCartDate(e.target.value);
    }

    const handleCheckOutCartDateChange = (e:any) => {
        setCheckOutCartDate(e.target.value);
    }
    
    const calculateTotalPrice = (startDates: any, endDates : any) => {
    
        const startDate = new Date(startDates).getTime();
        const endDate = new Date(endDates).getTime();
    
        if (startDate && endDate && startDate <= endDate) {
          const durationInMs = endDate - startDate;
          const numberOfDays = durationInMs / (1000 * 60 * 60 * 24);
          const totalPrice = numberOfDays * room.price;
          setTotalPrice(totalPrice);
        } else {
          setTotalPrice(0);
        }
    };

    const [showBuyRoomForm, setShowBuyRoomForm] = useState(false);
    const [showCartRoomForm, setShowCartRoomForm] = useState(false);
    const toggleButton = () => {
        setTotalPrice(0);
        setCheckInDate("");
        setCheckOutDate("");
        setShowBuyRoomForm(!showBuyRoomForm);
    };

    const toggleCartButton = () => {
        setTotalPrice(0);
        setCheckInCartDate("");
        setCheckOutCartDate("");
        setShowCartRoomForm(!showCartRoomForm);
    }

    return (
        <div className="room-card">
            <div className="room-image">
                <div className="main-image">
                    <img
                    key={0}
                    src={
                        room.roomPicture && room.roomPicture.length > 0
                        ? room.roomPicture[0].roomPicture
                        : defaultImageUrl
                    }
                    className="rectangle-image"
                    />
                </div>
                <div className="secondary-room-image">
                {[...Array(3)].map((_, index) => (
                    <img
                    key={index + 1}
                    src={
                        room.roomPicture && room.roomPicture.length > index + 1
                        ? room.roomPicture[index + 1].roomPicture
                        : defaultImageUrl
                    }
                    className="square-image"
                    />
                ))}
                </div>
            </div>
            <div className="room-details">
                <h3>{room.roomName}</h3>
                <p>{room.bedType}</p>
                <p>{room.quantity} room left</p>
                <div className="room-occupancy">
                    <p><IoPeopleOutline /> {room.occupancy}</p>
                </div>
            </div>
            <div className="room-price">
                {currency == "IDR" ? (
                    <p>Rp. {room.price} <span className="flight-schedule-price-org">/org</span></p>
                    ) : (
                    <p>$ {(room.price / 14000).toFixed(4)} <span className="flight-schedule-price-org">/people</span></p>
                )}
                <div className="button-container">
                    <button onClick={toggleCartButton} className="add-to-cart-button">Add to Cart</button>
                    <button onClick={toggleButton}>Buy</button>
                </div>
            </div>
            <div className={`add-form ${showBuyRoomForm ? 'open' : ''}`}>
                <h2>Buy Room</h2>
                <form onSubmit={submitForm}>
                    <div className="text-field">
                        <label htmlFor="check-in-date">Check In Date</label>
                        <input type="date" name="check-in-date" id="check-in-date" 
                        value={checkInDate}
                        onChange={handleCheckInDateChange}/>
                    </div>
                    <div className="text-field">
                        <label htmlFor="check-in-date">Check Out Date</label>
                        <input type="date" name="check-out-date" id="check-out-date" value={checkOutDate} onChange={handleCheckOutDateChange} />
                    </div>
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
                    <p>{totalprice}</p>
                    <Button content="Buy"/>
                </form>
            </div>
            <div className={`add-form ${showCartRoomForm ? 'open' : ''}`}>
                <h2>Add To Cart</h2>
                <form onSubmit={submitCartForm}>
                    <div className="text-field">
                        <label htmlFor="check-in-date">Check In Date</label>
                        <input type="date" name="check-in-date" id="check-in-date" 
                        value={checkInCartDate}
                        onChange={handleCheckInCartDateChange}/>
                    </div>
                    <div className="text-field">
                        <label htmlFor="check-in-date">Check Out Date</label>
                        <input type="date" name="check-out-date" id="check-out-date" value={checkOutCartDate} onChange={handleCheckOutCartDateChange} />
                    </div>
                    <p>{totalprice}</p>
                    <Button content="Add to Cart"/>
                </form>
            </div>
            <div className={`overlay ${showBuyRoomForm ? 'open' : ''}`} onClick={() => setShowBuyRoomForm(false)}></div>
            <div className={`overlay ${showCartRoomForm ? 'open' : ''}`} onClick={() => setShowCartRoomForm(false)}></div>
        </div>
    );
};

export default RoomCard;
