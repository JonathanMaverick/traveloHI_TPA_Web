import { useEffect, useState } from "react"
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import { useParams } from "react-router-dom";
import get_hotel_by_id from "../../api/hotel/get_hotel_by_id";
import "../../styles/pages/hotel/hotel-detail.scss"
import RoomCard from "./roomCard";
import { FaLocationDot } from "react-icons/fa6";

export default function HotelDetail(){
    const {id} = useParams();
    const defaultImageUrl = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
    const [hotel, setHotel] = useState<IHotel | undefined>();
    const [mainImage, setMainImage] = useState(
      hotel?.hotelPictures[0]?.hotelPicture
    );

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
                    setMainImage(response.data.hotelPictures[0].hotelPicture);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
        }
        fetchData();
    }
    , []);
    if(!hotel){
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    const handleThumbnailClick = (index:number) => {
        if (hotel.hotelPictures && hotel.hotelPictures.length > index) {
          setMainImage(hotel.hotelPictures[index].hotelPicture);
        }
    };

    return(
        <>
            <div className="hotel-detail">
            <div className="hotel-info">
                <h1 className="hotel-name">{hotel.hotelName}</h1>
                <p className="location">
                    <FaLocationDot /> {hotel.hotelAddress} - {hotel.hotelCity}
                </p>
            </div>
                <div className="image-container">
                    <img
                        className="main-image-detail"
                        src={mainImage}
                        alt={hotel.hotelName}
                    />
                    <div className="secondary-hotel-images">
                        {[...Array(hotel.hotelPictures.length)].map((_, index) => (
                        <img
                            key={index}
                            src={hotel.hotelPictures && hotel.hotelPictures.length > index ? hotel.hotelPictures[index].hotelPicture : defaultImageUrl}
                            className="thumbnail-image"
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleThumbnailClick(index)}
                        />
                        ))}
                    </div>
                </div>
                <div className="hotel-content">
                    <div className="hotel-detail-content">
                        <div className="hotel-description">
                            <h3>Hotel Description</h3>
                            <p>{hotel.hotelDescription}</p>
                        </div>
                        <div className="hotel-facilities-list">
                            <h3>Hotel Facilities</h3>
                            {hotel.hotelFacilities && hotel.hotelFacilities.length > 0 && (
                                <div className="facilities-list">
                                    {hotel.hotelFacilities.map((facility, index) => (
                                        <div className="facilities">
                                            <p key={index}>{facility.facilities?.facilitiesName}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="room-list">
                        {hotel.rooms && hotel.rooms.length > 0 ? (
                        hotel.rooms.map((room) => (
                            <RoomCard key={room.roomID} room={room} />
                        ))
                        ) : (
                            <p>No rooms available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}