import { IoPeopleOutline } from "react-icons/io5";
import "../../styles/pages/hotel-card.scss";
import useCurrency from "../../contexts/currency-context";
import { IHotelTransaction } from "../../interfaces/hotel/hotel-transaction-interface";

const HotelTransactionCard = ({ transaction , type}: { transaction: IHotelTransaction, type? : string | null }) => {
  const defaultImageUrl =
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

    const {currency} = useCurrency();

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
                                <button>Leave Review</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default HotelTransactionCard;
