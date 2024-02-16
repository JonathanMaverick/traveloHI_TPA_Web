import { IoPeopleOutline } from "react-icons/io5";
import "../../styles/pages/hotel-card.scss";
import useCurrency from "../../contexts/currency-context";
import { IHotelTransaction } from "../../interfaces/hotel/hotel-transaction-interface";
import { IReview } from "../../interfaces/review/review-interface";
import { FormEvent, useState } from "react";
import TextArea from "../../component/text-area";
import Button from "../../component/button";
import add_review from "../../api/review/add_review";
import useUser from "../../contexts/user-context";

const HotelTransactionCard = ({ transaction , type}: { transaction: IHotelTransaction, type? : string | null }) => {
  const defaultImageUrl =
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

    const {currency} = useCurrency();
    const {user} = useUser();
    const INITIAL_REVIEW_STATE : IReview = {
        reviewID: 0,
        review: "",
        userID : 0,
        hotelID : 0,
        cleanliness : 0,
        comfort : 0,
        location : 0,
        service : 0,
        transactionID : transaction.id || 0,
        isAnonymous : false,
        user: undefined
    };

    const addReview = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(user){
            review.userID = user.userID || 0;
            review.hotelID = transaction.hotelID || 0;
            review.transactionID = transaction.id || 0;
            const response = await add_review(review);
            if(response == -1){
                return;
            }
            else{
                alert(response.data.message);
                window.location.reload()
            }
        }
    }

    const [review, setReview] = useState<IReview>(INITIAL_REVIEW_STATE);
    const [reviewForm, setReviewForm] = useState(false);

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
                <div className="review-button">
                    {
                        type === "history" && !transaction.isReviewed && (
                            <div className="button">
                                <button onClick={() => setReviewForm(!reviewForm)}>
                                    Leave Review
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={`overlay ${reviewForm ? 'open' : ''}`} onClick={() => setReviewForm(false)}></div>
            <div className={`review-add-form ${reviewForm ? 'open' : ''}`}>
                <h2>Review</h2>
                <form action="" onSubmit={addReview} className="review-form">
                    <TextArea
                        name="review"
                        value={review.review}
                        placeholder="Write your review here..."
                        onChange={(e:string) => setReview({ ...review, review: e })}
                    />
                    <div className="form-rating-container">
                        <div className="rating-field">
                            <input 
                                type="number" 
                                name="cleanliness"
                                value={review.cleanliness}
                                max={10}
                                min={0}
                                onChange={(e) => setReview({ ...review, cleanliness: parseInt(e.target.value) })}
                            />
                            <label htmlFor="">Cleanliness</label>
                        </div>
                        <div className="rating-field">
                            <input 
                                type="number" 
                                name="comfort"
                                value={review.comfort}
                                max={10}
                                min={0}
                                onChange={(e) => setReview({ ...review, comfort: parseInt(e.target.value) })}
                            />
                            <label htmlFor="">Comfort</label>
                        </div>
                        <div className="rating-field">
                            <input 
                                type="number" 
                                name="location"
                                value={review.location}
                                max={10}
                                min={0}
                                onChange={(e) => setReview({ ...review, location: parseInt(e.target.value) })}
                            />
                            <label htmlFor="">Location</label>
                        </div>
                        <div className="rating-field">
                            <input 
                                type="number" 
                                name="cleanliness"
                                value={review.service}
                                max={10}
                                min={0}
                                onChange={(e) => setReview({ ...review, service: parseInt(e.target.value) })}
                            />
                            <label htmlFor="">Service</label>
                        </div>
                    </div>
                    <div className="anonymous-container">
                        <input 
                            type="checkbox" 
                            id="Anonymous" 
                            name="Anonymous" 
                            checked={review.isAnonymous}
                            onChange={(e) => setReview({ ...review, isAnonymous: e.target.checked })}
                        />
                        <label htmlFor="anonymous"> Anonymous </label>
                    </div>
                    <Button
                        content="Submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default HotelTransactionCard;
