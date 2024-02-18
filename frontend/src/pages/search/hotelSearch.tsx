import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import search_hotel from "../../api/hotel/search_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import HotelSearchCard from "./hotelSearchCard";
import "../../styles/pages/hotel-card.scss"
import { IFacility } from "../../interfaces/hotel/facility-interface";
import { IRoom } from "../../interfaces/hotel/room-interface";

export default function HotelSearch({priceFilterOption, ratingFilterOption, selectedFacilities, hotelSortOption, roomAvailabilitySortOption, ratingSortOption, reviewCountSortOption} : {selectedFacilities: IFacility[],  ratingFilterOption: boolean, hotelSortOption: string, roomAvailabilitySortOption: string, ratingSortOption: string, reviewCountSortOption: string, priceFilterOption: boolean}) {

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

    useEffect(() => {
        const sortHotels = (hotels: IHotel[], option: string) => {
            if (option === 'ascending') {
                const sortedHotels = hotels.slice().sort((a, b) => {
                    if (a.roomAvailable && b.roomAvailable) {
                        return a.roomAvailable - b.roomAvailable;
                    }
                    return 0; 
                });
                setHotelList(sortedHotels);
            } else if (option === 'descending') {
                const sortedHotels = hotels.slice().sort((a, b) => {
                    if (a.roomAvailable && b.roomAvailable) {
                        return b.roomAvailable - a.roomAvailable;
                    }
                    return 0; 
                });
                setHotelList(sortedHotels);
            }
        };
    
        sortHotels(hotelList, roomAvailabilitySortOption);
    }, [roomAvailabilitySortOption]);

    useEffect(() => {
        const sortHotels = (hotels: IHotel[], option: string) => {
            let sortedHotels = [...hotels];
            if (option === 'ascending') {
                sortedHotels = hotels.slice().sort((a, b) => {
                    if (a.hotelRating !== undefined && b.hotelRating !== undefined) {
                        return a.hotelRating - b.hotelRating;
                    }
                    return 0;
                });
            } else if (option === 'descending') {
                sortedHotels = hotels.slice().sort((a, b) => {
                    if (a.hotelRating !== undefined && b.hotelRating !== undefined) {
                        return b.hotelRating - a.hotelRating;
                    }
                    return 0;
                });
            }
            setHotelList(sortedHotels);
        };
    
        sortHotels(hotelList, ratingSortOption);
    }, [ratingSortOption]);

    useEffect(() => {
        if(ratingFilterOption){
            const filtered = hotelList.filter((hotel) => hotel.hotelRating !== undefined && hotel.hotelRating >= 5);
            setHotelList(filtered);
        }
        else{
            fetchData();
        }
    }, [ratingFilterOption]);

    useEffect(() => {
        const sortHotels = (hotels: IHotel[], option: string) => {
            if (option === 'ascending') {
                const sortedHotels = hotels.slice().sort((a, b) => {
                    if (a.reviewCount !== undefined && b.reviewCount !== undefined) {
                        return a.reviewCount - b.reviewCount;
                    }
                    return 0; 
                });
                setHotelList(sortedHotels);
            } else if (option === 'descending') {
                const sortedHotels = hotels.slice().sort((a, b) => {
                    if (a.reviewCount !== undefined && b.reviewCount !== undefined) {
                        if (a.reviewCount === 0) {
                            return 1; 
                        } else if (b.reviewCount === 0) {
                            return -1; 
                        } else {
                            return b.reviewCount - a.reviewCount; 
                        }
                    }
                    return 0; 
                });
                setHotelList(sortedHotels);
            }
        };
    
        sortHotels(hotelList, reviewCountSortOption);
    }, [reviewCountSortOption]);

    useEffect(() => {
        const filterHotelsByPrice = (hotels: IHotel[], priceFilterOption: boolean) => {
            let filteredHotels = hotels;
    
            if (priceFilterOption) {
                filteredHotels = hotels.filter(hotel => {
                    const minPrice = Array.isArray(hotel.rooms)
                        ? Math.min(...hotel.rooms.map((room: IRoom) => room.price))
                        : 0;
                    return minPrice < 10000;
                });
            }
            else{
                fetchData();
            }
            setHotelList(filteredHotels);
        };
    
        filterHotelsByPrice(hotelList, priceFilterOption);
    }, [priceFilterOption]);

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