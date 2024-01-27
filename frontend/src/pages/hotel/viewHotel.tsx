import { useEffect, useState } from "react";
import get_hotel from "../../api/hotel/get_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import HotelCard from "./hotelCard";
import "../../styles/pages/hotel-card.scss"

export default function ViewHotel() {
  const [hotel, setHotel] = useState<IHotel[]>([]);

  useEffect(() => {
    document.title = 'View Hotel';
    const fetchData = async () => {
      try {
        const response = await get_hotel();
        if (response !== -1) {
          setHotel(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="hotel-list">
        {hotel.map((h: IHotel) => (
          <div key={h.hotelAddress} className="hotel-card">
            <HotelCard hotel={h} />
          </div>
        ))}
      </div>
    </div>
  );
};