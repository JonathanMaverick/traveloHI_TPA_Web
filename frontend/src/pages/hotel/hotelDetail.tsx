import { useEffect, useState } from "react"
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import { useParams } from "react-router-dom";
import get_hotel_by_id from "../../api/hotel/get_hotel_by_id";
import "../../styles/pages/hotel/hotel-detail.scss"
import RoomCard from "./roomCard";

export default function HotelDetail(){
    const {id} = useParams();
    const defaultImageUrl = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';

    useEffect(() => {
        document.title = `Hotel Detail`;
        const fetchData = async () => {
            try {
                const response = await get_hotel_by_id(id || '');
                if (response == -1){
                    return;
                }
                else{
                    setHotel(response.data);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
        }
        fetchData();
    }
    , []);
    const [hotel, setHotel] = useState<IHotel>();
    if(!hotel){
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    return(
        <>
            <div className="hotel-detail">
                <h1 className="hotel-name">{hotel.hotelName}</h1>
                <p>{hotel.hotelDescription}</p>
                <div className="image-container">
                    <img
                        className="main-image-detail"
                        src={hotel?.hotelPictures[0]?.hotelPicture || defaultImageUrl}
                        alt={hotel.hotelName}
                    />
                    <div className="secondary-hotel-images">
                        {[...Array(4)].map((_, index) => (
                            <img
                                key={index}
                                src={hotel.hotelPictures && hotel.hotelPictures.length > index ? hotel.hotelPictures[index].hotelPicture : defaultImageUrl}
                                className="thumbnail-image"
                                alt={`Thumbnail ${index }`}
                            />
                        ))}
                    </div>
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                    hotel.rooms.map((room) => (
                        <RoomCard key={room.roomID} room={room} />
                    ))
                    ) : (
                        <p>No rooms available.</p>
                    )}
                </div>
            </div>
        </>
    )
}