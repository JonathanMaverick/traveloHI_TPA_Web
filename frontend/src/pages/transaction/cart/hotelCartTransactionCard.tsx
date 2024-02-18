import { IoPeopleOutline } from "react-icons/io5";
import "../../../styles/pages/hotel-card.scss";
import { useEffect, useState } from "react";
import useCurrency from "../../../contexts/currency-context";
import Button from "../../../component/button";
import { IHotelCart } from "../../../interfaces/hotel/hotel-cart-interface";
import add_hotel_transaction_from_cart from "../../../api/hotel_cart/add_hotel_transaction_from_cart";
import TextField from "../../../component/text-field";
import update_hotel_cart from "../../../api/hotel_transaction/update_hotel_cart";

const HotelCartTransactionCard = ({ transaction}: { transaction: IHotelCart}) => {
  const defaultImageUrl =
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

    const {currency} = useCurrency();
    const [totalPrice, setTotalPrice] = useState(0);

    const [updateForm, setUpdateForm] = useState(false);
    const [transactionDate, setTransactionDate] = useState({
      checkInDate: transaction.checkInDate,
      checkOutDate: transaction.checkOutDate
    });
  
    const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTransactionDate({
        ...transactionDate,
        checkInDate: e.target.value
      });
    };
  
    const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTransactionDate({
        ...transactionDate,
        checkOutDate: e.target.value
      });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const updatedTransaction = {
        ...transaction,
        checkInDate: transactionDate.checkInDate,
        checkOutDate: transactionDate.checkOutDate,
        price : totalPrice
      };
      if(transaction.id){
        const response = await update_hotel_cart(updatedTransaction, transaction.id);
        if (response != -1){
            alert("Transaction updated successfully");
            window.location.reload();
        }
      }
    };

    useEffect(() => {
        calculateTotalPrice(transactionDate.checkInDate, transactionDate.checkOutDate);
    }, [transactionDate]);

    const calculateTotalPrice = (startDates: any, endDates : any) => {
    
        const startDate = new Date(startDates).getTime();
        const endDate = new Date(endDates).getTime();
    
        if (startDate && endDate && startDate <= endDate) {
          const durationInMs = endDate - startDate;
          const numberOfDays = durationInMs / (1000 * 60 * 60 * 24);
          const totalPrice = numberOfDays * transaction.Room!.price;
          setTotalPrice(totalPrice);
        } else {
          setTotalPrice(0);
        }
    };

    const [checkOut, setCheckOut] = useState(false);
    const handleCartCheckOut = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const paymentId = paymentOption === "hi-wallet" ? 2 : 1;
      const hotel_cart = {
          ...transaction,
          paymentID: paymentId,
          promoCode: promoCode
      };
      const response = await add_hotel_transaction_from_cart(hotel_cart);
      if(response != -1){
          alert("Hotel Transaction Success");
          window.location.reload();
      }
      else{
          return;
      }
    };

    const [promoCode, setPromoCode] = useState("");
    const [paymentOption, setPaymentOption] = useState("hi-wallet");

    return (
        <div className="room-card">
            <div className="room-image">
                <div className="main-image">
                    <img
                    key={0}
                    src={
                        transaction.Room && transaction.Room.roomPicture && transaction.Room.roomPicture.length > 0
                        ? transaction.Room.roomPicture[0].roomPicture
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
                        transaction.Room && transaction.Room.roomPicture && transaction.Room.roomPicture.length > index + 1
                        ? transaction.Room.roomPicture[index + 1].roomPicture
                        : defaultImageUrl
                    }
                    className="square-image"
                    />
                ))}
                </div>
            </div>
            <div className="room-details">
                <h3>{transaction.Room && transaction.Hotel?.hotelName} - {transaction.Room && transaction.Room.roomName}</h3>
                <div className="date-section">
                    <p>{transaction.checkInDate} - {transaction.checkOutDate}</p>
                </div>
                <p>{transaction.Room && transaction.Room.bedType}</p>
                <div className="room-occupancy">
                    <p><IoPeopleOutline /> {transaction.Room && transaction.Room.occupancy}</p>
                </div>
            </div>
            <div className="room-price">
                {currency == "IDR" ? (
                    <p>Rp. {transaction.price}</p>
                    ) : (
                    <p>$ {(transaction.price / 14000).toFixed(4)}</p>
                )}
                <div className="reviews-button">
                    {
                        <>
                        <div className="button">
                            <button onClick={() => setUpdateForm(!updateForm)}>
                                Update
                            </button>
                        </div>
                        <div className="button">
                            <button onClick={() => setCheckOut(!checkOut)}>Check Out</button>
                        </div>
                        </>
                    }
                </div>
            </div>
            <div className={`overlay ${updateForm ? 'open' : ''}`} onClick={() => setUpdateForm(false)}></div>
            <div className={`review-add-form ${updateForm ? 'open' : ''}`}>
                <h2>Update</h2>
                <form onSubmit={handleSubmit} className="review-form">
                <div className="text-field">
                    <label htmlFor="check-in">Check In</label>
                    <input type="date" value={transactionDate.checkInDate} onChange={handleCheckInChange} />
                </div>
                <div className="text-field">
                    <label htmlFor="check-out">Check Out</label>
                    <input type="date" value={transactionDate.checkOutDate} onChange={handleCheckOutChange} />
                </div>
                {totalPrice}
                <Button content="Update" />
                </form>
            </div>
            <div className={`overlay ${checkOut ? 'open' : ''}`} onClick={() => setCheckOut(false)}></div>
        <div className={`check-out-form ${checkOut ? 'open' : ''}`}>
            <h2>Check Out</h2>
            <form onSubmit={handleCartCheckOut} className="review-form">
                <div className="text-field">
                <label htmlFor="flight-payment">Payment Method</label>
                <select
                    id="hotel-payment"
                    name="hotel-payment"
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
                {currency === "IDR" ? (
                  <p>Rp. {transaction.price}</p>
                ) : (
                  <p>$ {(transaction.price / 14000 ).toFixed(4)} <span className="flight-schedule-price-org"></span></p>
                )}
            <Button content="Check Out" />
            </form>
        </div>
        </div>
    );
};

export default HotelCartTransactionCard;
