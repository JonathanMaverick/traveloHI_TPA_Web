import { useEffect, useState } from "react"
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import { useParams } from "react-router-dom";
import get_hotel_by_id from "../../api/hotel/get_hotel_by_id";
import "../../styles/pages/hotel/hotel-detail.scss"
import RoomCard from "./roomCard";
import { FaLocationDot } from "react-icons/fa6";
import get_hotel_review from "../../api/review/get_hotel_review";
import { IReview } from "../../interfaces/review/review-interface";
import { FaStar } from "react-icons/fa";

export default function HotelDetail(){
    const {id} = useParams();
    const defaultImageUrl = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
    const [hotel, setHotel] = useState<IHotel | undefined>();
    const [reviews, setReviews] = useState<IReview[] | undefined>([]);
    const [mainImage, setMainImage] = useState(
      hotel?.hotelPictures[0]?.hotelPicture
    );

    useEffect(() => {
        document.title = `Hotel Detail`;
        const fetchData = async () => {
            try {
                const response = await get_hotel_by_id(id || '');
                const response2 = await get_hotel_review(id || '');
                if (response == -1){
                    return;
                }
                else{
                    setHotel(response.data);
                    setMainImage(response.data.hotelPictures[0].hotelPicture);
                }

                if (response2 == -1){
                    return;
                }
                else{
                    console.log(response2.data.data)
                    setReviews(response2.data.data);
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

    const getReview = (review : IReview) =>{
        return ((review.cleanliness + review.comfort + review.location + review.service) / 4).toFixed(1)
    }

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
                                        <div className="facilities" key={index}>
                                            <p>{facility.facilities?.facilitiesName}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="left-hotel-detail">
                        <div className="rating">
                            <div className="rating-container">
                                <p>Cleanliness</p>
                                <p className="rating-content">7/10</p>
                            </div>
                            <div className="rating-container">
                                <p>Comfort</p>
                                <p className="rating-content">6/10</p>
                            </div>
                            <div className="rating-container">
                                <p>Location</p>
                                <p className="rating-content">5/10</p>
                            </div>
                            <div className="rating-container">
                                <p>Service</p>
                                <p className="rating-content">3/10</p>
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
                <div className="review">
                    <h2>Review</h2>
                    <div className="review-list">
                        {reviews && reviews.length > 0 && (
                            reviews.map((review) => (
                                <div className="review-card" key={review.reviewID}>
                                    <div className="review-card-content">
                                        <div className="review-card-name">
                                            {review.userID == 0 ? (
                                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                                            ): (
                                                <img src={review.user.profilePicture} alt="" />
                                            )}
                                            <p>{review.user.firstName} {review.user.lastName}</p>
                                        </div>
                                        <div className="review-card-description">
                                            <p>{review.review}</p>
                                        </div>
                                    </div>
                                    <div className="review-card-rating">
                                        <p><FaStar color="yellow" /> {getReview(review)} / 10.0</p>
                                    </div>
                                </div>    
                        )))}
                    </div>
                </div>
            </div>
        </>
    )
}