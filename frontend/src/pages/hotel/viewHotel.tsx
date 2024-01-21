import { useEffect, useState } from "react";
import getHotel from "../../api/hotel/get_hotel";
import { IHotel } from "../../interfaces/hotel/hotel-interface";

export default function ViewHotel() {
  const [hotel, setHotel] = useState<IHotel[]>([]);

  useEffect(() => {
    document.title = 'View Hotel';
    const fetchData = async () => {
      try {
        const response = await getHotel();
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
      <h1>View Hotel</h1>
      <div>
      {hotel.map((h: IHotel, index: number) => (
        <div key={index} className="hotel-card">
          <img src={h.hotelPictures[0].hotelPicture} alt="" />
          <h2>{h.hotelName}</h2>
          <p>{h.hotelDescription}</p>
          <p>Address: {h.hotelAddress}</p>
          <p>City: {h.hotelCity}</p>
          <p>Facilities:</p>
          <ul>
            {h.hotelFacilities.map((facility, facilityIndex) => (
              <li key={facilityIndex}>{facility.facilities.facilitiesName}</li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}
