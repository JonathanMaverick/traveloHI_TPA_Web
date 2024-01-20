import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import TextField from "../../component/text-field";
import TextArea from "../../component/text-area";
import { IHotel } from "../../interfaces/hotel-interface";
import { IRoom } from "../../interfaces/room-interface";
import "../../styles/pages/add-hotel.scss";
import getFacilities from "../../api/hotel/get_facilities";
import { IFacility } from "../../interfaces/facility-interface";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Button from "../../component/button";

export default function AddHotel() {
  useEffect(() => {
    document.title = "Add Hotel";
    const fetchData = async () => {
      try {
        const response = await getFacilities();
        if(response != -1){
          setFacilities(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
    images: [],
  };
  
  const [hotelData, setHotelData] = useState<IHotel>(INITIAL_HOTEL_DATA);
  const [roomData, setRoomData] = useState<IRoom>(INITIAL_ROOM_DATA);
  const [tempRooms, setTempRooms] = useState<IRoom[]>([]);
  const [hotelImages, setHotelImages] = useState<File[]>([]);
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<IFacility[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    const selectedFiles = e.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const newImages = Array.from(selectedFiles);
      setHotelImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleRoomImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
  
    if (selectedFiles && selectedFiles.length > 0) {
      const newImages = Array.from(selectedFiles);
      setRoomData((prevRoomData: IRoom) => ({
        ...prevRoomData,
        images: [...prevRoomData.images, ...newImages],
      }));
    }
  };
  
  const [step, setStep] = useState(1);

  const handleRoomFormSubmit = () => {
    setTempRooms((prevRooms) => [...prevRooms, roomData]);
    setRoomData(INITIAL_ROOM_DATA); 
  };

  const handleAddFacility = () => {
    if (selectedFacilityId && selectedFacilityId !== "") {
      if (selectedFacilityId) {
        const isFacilityAlreadySelected = selectedFacilities.some(facility => facility.facilitiesID === parseInt(selectedFacilityId, 10));
    
        if (!isFacilityAlreadySelected) {
          const selectedFacility = facilities.find(facility => facility.facilitiesID === parseInt(selectedFacilityId, 10));
          
          if (selectedFacility) {
            setSelectedFacilities((prevSelectedFacilities: IFacility[]) => [...prevSelectedFacilities, selectedFacility]);
            setSelectedFacilityId('');
          }
        }
      }
    }
  };

  const handleRemoveFacility = (facilityId: number) => {
    setSelectedFacilities((prevSelectedFacilities) => prevSelectedFacilities.filter(facility => facility.facilitiesID !== facilityId));
  };

  const handleHotelSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hotelData.hotelName || !hotelData.hotelDescription || !hotelData.hotelAddress) {
      alert('Please fill in all hotel details.');
      return;
    }

    if (selectedFacilities.length === 0) {
      alert('Please select at least one facility.');
      return;
    }

    if (hotelImages.length === 0) {
      alert('Please upload at least one hotel image.');
      return;
    }

    console.log(selectedFacilities);

    setStep(2);
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleHotelSubmit}>
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
            {selectedFacilities.length > 0 && (
              <div>
                <p>Selected Facilities:</p>
                <div className="selected-facilities">
                  {selectedFacilities.map((facility) => (
                    <div className="facilities-container" key={facility.facilitiesID}>
                      {facility.facilitiesName}
                      <button type="button" onClick={() => handleRemoveFacility(facility.facilitiesID)}>
                        <IoIosRemoveCircleOutline />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="text-field">
              <label htmlFor="facilitiesDropdown">Select Facility:</label>
              <select
                id="facilitiesDropdown"
                value={selectedFacilityId}
                onChange={(e) => setSelectedFacilityId(e.target.value)}
              >
                <option value="">-- Select Facilities --</option>
                {facilities.map((facility) => (
                  <option key={facility.facilitiesID} value={facility.facilitiesID}>
                    {facility.facilitiesName}
                  </option>
                ))}
              </select>
              <button type="button" className="add-button" onClick={handleAddFacility}>
                Add Facility
              </button>
            </div>
            {hotelImages.length > 0 && (
              <div>
                <p>Preview:</p>
                {hotelImages.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    style={{ height: '200px', width: '250px', objectFit: 'cover', marginRight: '10px' }}
                    alt={`Preview-${index}`}
                  />
                ))}
              </div>
            )}
            <div className="text-field">
              <label htmlFor="hotelpictures">Hotel image</label>
              <input
                type="file"
                id="hotelpictures"
                name="hotelpictures"
                onChange={handleImageChange}
                multiple
              />
            </div>
            <Button content="Add Hotel"/>
          </form>
        );
      case 2:
        return (
        <>
          {tempRooms.map((room, index) => (
            <div key={`temp-${index}`}>
              <p>{`${room.roomName} - Price: ${room.price} - Occupancy: ${room.occupancy}`}</p>
              {room.images.length > 0 && (
                <div>
                  <p>Room Images:</p>
                  {room.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={URL.createObjectURL(image)}
                      style={{
                        height: '100px',
                        width: '100px',
                        objectFit: 'cover',
                        marginRight: '10px',
                      }}
                      alt={`Room-${index}-Image-${imageIndex}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          <div>
            <h3>Add Room</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                label="Room Name"
                name="roomName"
                type="text"
                value={roomData?.roomName}
                onChange={(e:string) => setRoomData({ ...roomData, roomName: e })}
              />
              <TextField
                label="Room Price"
                name="price"
                type="number"
                value={roomData?.price.toString()}
                onChange={(e:string) => setRoomData({ ...roomData, price: parseInt(e) })}
              />
              <TextField
                label="Room Occupancy"
                name="occupancy"
                type="number"
                value={roomData?.occupancy.toString()}
                onChange={(e:string) => setRoomData({ ...roomData, occupancy: parseInt(e) })}
              />
              <TextField
                label="Room Quantity"
                name="quantity"
                type="number"
                value={roomData?.quantity.toString()}
                onChange={(e:string) => setRoomData({ ...roomData, quantity: parseInt(e) })}
              />
              <div className="text-field">
                <label htmlFor="roomimages">Room Images</label>
                <input
                  type="file"
                  id="roomimages"
                  name="roomimages"
                  onChange={handleRoomImageChange}
                  multiple
                />
              </div>
              <button type="submit" onClick={handleRoomFormSubmit}>
                Submit Room
              </button>
            </form>
          </div>
        </>
      );
    }
  };
  
  return (
    <div className="add-hotel">
      {renderStep()}
    </div>
  );
}