import { IoPeopleOutline } from "react-icons/io5";
import useCurrency from "../../contexts/currency-context";
import { IRoom } from "../../interfaces/hotel/room-interface";
import "../../styles/pages/hotel-card.scss";

const RoomCard = ({ room }: { room: IRoom }) => {
  const defaultImageUrl =
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";

    const {currency} = useCurrency();

    return (
        <div className="room-card">
        <div className="room-image">
            <img
            key={0}
            src={
                room.roomPicture && room.roomPicture.length > 0
                ? room.roomPicture[0].roomPicture
                : defaultImageUrl
            }
            className="rectangle-image"
            />
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
            <button>Buy</button>
        </div>
        </div>
    );
};

export default RoomCard;
