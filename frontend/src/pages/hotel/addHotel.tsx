import { useState, useEffect } from "react";
import TextField from "../../component/text-field";
import TextArea from "../../component/text-area";
import { IHotel } from "../../interfaces/hotel-interface";
import { IRoom } from "../../interfaces/room-interface";
import "../../styles/pages/add-hotel.scss";

export default function AddHotel() {
  useEffect(() => {
    document.title = "Add Hotel";
  }, []);

  const INITIAL_HOTEL_DATA: IHotel = {
    hotelName: "",
    hotelDescription: "",
    hotelAddress: "",
  };

  const INITIAL_ROOM_DATA: IRoom = {
    roomName: "",
    hotelID: "",
    bedTypeID: "", 
    price: 0,
    occupancy: 0,
    quantity: 0,
  };

  const [hotelData, setHotelData] = useState<IHotel>(INITIAL_HOTEL_DATA);
  const [roomData, setRoomData] = useState<IRoom>(INITIAL_ROOM_DATA);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [tempRooms, setTempRooms] = useState<IRoom[]>([]);

  const handleAddRoomClick = () => {
    setShowRoomForm((prevShowRoomForm) => !prevShowRoomForm);
  };

  const handleRoomFormSubmit = () => {
    setTempRooms((prevRooms) => [...prevRooms, roomData]);

    setRoomData(INITIAL_ROOM_DATA); 
    setShowRoomForm(false); 
  };

  return (
    <div className="add-hotel">
        <h2>Add Hotel</h2>
        <TextField
            label="Hotel Name"
            name="hotelName"
            value={hotelData?.hotelName}
            onChange={(e:string) => setHotelData({ ...hotelData, hotelName: e })}
        />
        <TextArea
            label="Hotel Description"
            name="hotelDescription"
            value={hotelData?.hotelDescription}
            onChange={(e) => setHotelData({ ...hotelData, hotelDescription: e })}
        />
        <TextField
            label="Hotel Address"
            name="hotelAddress"
            value={hotelData?.hotelAddress}
            onChange={(e:string) => setHotelData({ ...hotelData, hotelAddress: e })}
        />
        <div>
            {tempRooms &&
            tempRooms.map((room, index) => (
                <div key={`temp-${index}`}>
                <p>{`${room.roomName} - Price: ${room.price} - Occupancy: ${room.occupancy}`}</p>
                </div>
            ))}
        </div>
        <button onClick={handleAddRoomClick}>
            {showRoomForm ? "Close Room Form" : "Add Room"}
        </button>

        {showRoomForm && (
            <div>
            <h3>Add Room</h3>
            <form onSubmit={(e) => e.preventDefault()}>
                <TextField label="Room Name" name="roomName" type="text" value={roomData?.roomName} onChange={(e:string) => setRoomData({ ...roomData, roomName: e })} />
                <TextField
                    label="Room Price"
                    name="price"
                    type="number"
                    value={roomData?.price.toString()}
                    onChange={(e: string) => setRoomData({ ...roomData, price: parseFloat(e) })}
                    />

                <TextField
                    label="Room Occupancy"
                    name="occupancy"
                    type="number"
                    value={roomData?.occupancy.toString()}
                    onChange={(e: string) => setRoomData({ ...roomData, occupancy: parseInt(e) })}
                />

                <TextField
                    label="Room Quantity"
                    name="quantity"
                    type="number"
                    value={roomData?.quantity.toString()}
                    onChange={(e: string) => setRoomData({ ...roomData, quantity: parseInt(e) })}
                />
            <button type="submit" onClick={handleRoomFormSubmit}>
              Submit Room
            </button>
          </form>
        </div>
      )}
    </div>
  );
}