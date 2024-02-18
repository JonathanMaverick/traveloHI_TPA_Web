import { FaLocationDot } from 'react-icons/fa6';
import { IHotel } from '../../interfaces/hotel/hotel-interface';
import '../../styles/pages/hotel-card.scss';
import useCurrency from '../../contexts/currency-context';
import { useNavigate } from 'react-router-dom';
import { LuBird } from 'react-icons/lu';

const HotelSearchCard = ({ hotel }: {hotel : IHotel}) => {

    const defaultImageUrl = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';
    const prices = hotel.rooms?.map((room) => room.price) || [];
    const minPrice = Math.min(...prices);
    const {currency} = useCurrency();
    const navigate = useNavigate();

    const handleViewDetail = () => {
        navigate(`/hotel/${hotel.hotelID}`);
    };

    return (
    <>
        <div className="hotel-image">
            <img
                key={0}
                src={hotel.hotelPictures && hotel.hotelPictures.length > 0 ? hotel.hotelPictures[0].hotelPicture : defaultImageUrl}
                className="rectangle-image"
            />
            <div className='secondary-hotel-image'>
                {[...Array(3)].map((_, index) => (
                    <img
                    key={index + 1}
                    src={hotel.hotelPictures && hotel.hotelPictures.length > index + 1 ? hotel.hotelPictures[index + 1].hotelPicture : defaultImageUrl}
                    className="square-image"
                    />
                ))}
            </div>
        </div>
        <div className="hotel-details">
            <div className='hotel-name'>
                <h3>{hotel.hotelName}</h3>
            </div>
            <div className='hotel-location'>
                <FaLocationDot className='icon-color' />
                <p>{hotel.hotelAddress} - {hotel.hotelCity}</p>
            </div>
            <div className='hotel-facilities'>
                {hotel.hotelFacilities?.slice(0, 3).map((facility, index) => (
                    <div key={index} className="facilities">
                        {facility.facilities?.facilitiesName}
                    </div>
                ))}
                {hotel.hotelFacilities && hotel.hotelFacilities.length > 3 && (
                    <div className="facilities">
                        {hotel.hotelFacilities.length - 3}+
                    </div>
                )}
            </div>
            <div className='extra-detail-room-information'>
                <h4 className='room-available'>Room Available : {hotel.roomAvailable}</h4>
                <p>Review Count : {hotel.reviewCount}</p>
            </div>
        </div>
        <div className='hotel-right'>
            <div className='hotel-rating'>
                {hotel.hotelRating == 0 ? (
                    <p>No Rating</p>
                ) : (
                    <>
                    <LuBird className='icon-color' size={20} /> <p>{hotel.hotelRating} / 10</p>
                    </>
                )}
            </div>
            <div className="hotel-price">
                {currency == "IDR" ? (
                  <p>Rp. {minPrice} </p>
                ) : (
                  <p>$ {(minPrice/ 14000).toFixed(4)} </p>
                )}
                <button onClick={handleViewDetail}>
                    Choose Room
                </button>
            </div>
        </div>
    </>
    );
};

export default HotelSearchCard;