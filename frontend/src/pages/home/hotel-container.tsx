import { useEffect, useState } from "react"
import get_top_hotels from "../../api/hotel_transaction/get_top_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import "../../styles/pages/hotel/top5-hotel.scss"
import { Link } from "react-router-dom";

export default function HotelContainer(){
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_top_hotels();
                if(response != -1){
                    setHotels(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    const [hotels, setHotels] = useState<IHotel[]>([]);

    return(
        <>
            <h1>Most Visited Hotel</h1>
            <div className="hotel-container">
                {hotels.map((hotel) => {
                    return(
                        <Link to={`/hotel/${hotel.hotelID}`} key={hotel.hotelID} className="top-5-hotel-card">
                            <div key={hotel.hotelID} className="top-5-hotel-card">
                                <img src={hotel.hotelPictures[0].hotelPicture} alt={hotel.hotelName} />
                                <div className="top-5-hotel-card-desc">
                                    <h3>{hotel.hotelName}</h3>
                                    <p>{hotel.hotelAddress} - {hotel.hotelCity}</p>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}