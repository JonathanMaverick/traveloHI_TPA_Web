import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import search_hotel from "../../api/hotel/search_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import HotelSearchCard from "./hotelSearchCard";
import "../../styles/pages/hotel-card.scss"

export default function HotelSearch() {

    const { query } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trimmedQuery = query?.trim();
                const response = await search_hotel(trimmedQuery || '');
                if (response == -1){
                    return;
                }
                else{
                    setHotelList(response.data);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
          };
      
          fetchData();
    }, [query]);

    const [hotelList, setHotelList] = useState<IHotel[]>([])

    return(
        <div className="hotel-search-result">
            <h1>Hotel</h1>
            <div className="hotel-list">
                {hotelList.map((hotel) => (
                    <div className="hotel-card" key={hotel.hotelID}>
                        <HotelSearchCard hotel={hotel} />
                    </div>
                ))}
            </div>
        </div>
    )
}