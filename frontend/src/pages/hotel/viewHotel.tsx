import { useEffect, useState } from "react";
import get_hotel from "../../api/hotel/get_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";

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
      <div>
      {hotel.map((h: IHotel) => (
        <div key={h.hotelAddress} className="hotel-card">
          <img src={h.hotelPictures![0].hotelPicture} alt="" />
          <h2>{h.hotelName}</h2>
          <p>{h.hotelDescription}</p>
          <p>Address: {h.hotelAddress}</p>
          <p>City: {h.hotelCity}</p>
          <p>Facilities:</p>
          <ul>
            {h.hotelFacilities!.map((facility, facilityIndex) => (
              <li key={facilityIndex}>{facility.facilities!.facilitiesName}</li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}
