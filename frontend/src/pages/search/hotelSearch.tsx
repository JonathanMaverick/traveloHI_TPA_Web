import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import search_hotel from "../../api/hotel/search_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import HotelSearchCard from "./hotelSearchCard";
import "../../styles/pages/hotel-card.scss"
import { IFacility } from "../../interfaces/hotel/facility-interface";
import { IRoom } from "../../interfaces/hotel/room-interface";

export default function HotelSearch({selectedFacilities, hotelSortOption} : {selectedFacilities: IFacility[], hotelSortOption: string}) {

    const { query } = useParams();
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
    useEffect(() => {
        fetchData();
    }, [query]);

    const [hotelList, setHotelList] = useState<IHotel[]>([])

    useEffect(() => {
        if (selectedFacilities.length === 0) {
            fetchData();
        }else{
            const filtered = hotelList.filter((hotel) => {
            const hotelFacilities = hotel.hotelFacilities?.map((facility) => facility.facilitiesID) || [];
            return selectedFacilities.every((selectedFacility) => hotelFacilities.includes(selectedFacility.facilitiesID));
            });
            setHotelList(filtered);
        }
    }, [selectedFacilities]); 

    useEffect(() => {
        const sortHotels = (hotels : IHotel[], option : string) => {
            const updatedHotels = hotels.map((hotel : IHotel) => {
                const minPrice = Array.isArray(hotel.rooms)
                  ? Math.min(...hotel.rooms.map((room : IRoom) => room.price))
                  : 0; 
                return {
                  ...hotel,
                  minPrice: minPrice,
                };
            });
    
            if (option === 'ascending') {
              const sortedHotels = updatedHotels.slice().sort((a, b) => a.minPrice - b.minPrice);
              setHotelList(sortedHotels);
            } else if (option === 'descending') {
              const sortedHotels = updatedHotels.slice().sort((a, b) => b.minPrice - a.minPrice);
              setHotelList(sortedHotels);
          };
        }
        sortHotels(hotelList, hotelSortOption);
    }, [hotelSortOption]);

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