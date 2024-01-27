import { FaLocationDot } from 'react-icons/fa6';
import { IHotel } from '../../interfaces/hotel/hotel-interface';

const HotelSearchCard = ({ hotel }: {hotel : IHotel}) => {

    const defaultImageUrl = 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg';

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
                <FaLocationDot />
                <p>{hotel.hotelAddress}</p>
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
        </div>
    </>
    );
};

export default HotelSearchCard;