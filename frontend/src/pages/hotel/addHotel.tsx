import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import TextField from "../../component/text-field";
import TextArea from "../../component/text-area";
import { IHotel } from "../../interfaces/hotel/hotel-interface";
import { IRoom } from "../../interfaces/hotel/room-interface";
import "../../styles/pages/add-hotel.scss";
import { IFacility } from "../../interfaces/hotel/facility-interface";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Button from "../../component/button";
import add_hotel from "../../api/hotel/add_hotel";
import add_hotel_picture from "../../api/hotel/add_hotel_picture";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../settings/firebase";
import { IHotelPicture } from "../../interfaces/hotel/hotel-picture-interface";
import { IHotelFacilities } from "../../interfaces/hotel/hotel-facilities-interface";
import add_hotel_facilities from "../../api/hotel/add_hotel_facilities";
import add_hotel_room from "../../api/hotel/add_hotel_room";
import { IRoomPicture } from "../../interfaces/hotel/room-picture-interface";
import add_room_picture from "../../api/hotel/add_room_picture";
import get_facilities from "../../api/hotel/get_facilities";

export default function AddHotel() {
  useEffect(() => {
    document.title = "Add Hotel";
    const fetchData = async () => {
      try {
        const response = await get_facilities();
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
    hotelCity: "",
    hotelPictures: [],
  };

  const INITIAL_ROOM_DATA: IRoom = {
    roomName: "",
    hotelID: 0,
    price: 0,
    occupancy: 0,
    quantity: 0,
    images: [],
    bedType: "",
    roomPicture: []
  };
  
  const [hotelID, setHotelID] = useState(0);
  const [hotelData, setHotelData] = useState<IHotel>(INITIAL_HOTEL_DATA);
  const [roomData, setRoomData] = useState<IRoom>(INITIAL_ROOM_DATA);
  const [tempRooms, setTempRooms] = useState<IRoom[]>([]);
  const [hotelImages, setHotelImages] = useState<File[]>([]);
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<IFacility[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleUploadImage = async(image : File, responseHotelID : number) => {
    const imageRef = ref(storage, `hotel/${responseHotelID}/${image.name}`);
    await uploadBytes(imageRef, image);
    const tempImage = await getDownloadURL(imageRef);
    const payload : IHotelPicture = {
      hotelID: responseHotelID,
      hotelPicture: tempImage,
    }
    const response = await add_hotel_picture(payload);
    if(response == -1)alert('Error adding hotel picture');
  }

  const handleUploadRoomImage = async (image: File, roomId : string) => {
    const imageRef = ref(storage, `room/${roomId}/${image.name}`);
    await uploadBytes(imageRef, image);
    const tempImage = await getDownloadURL(imageRef);
    const payload : IRoomPicture = {
      roomID: roomId,
      roomPicture: tempImage,
    }
    const response = await add_room_picture(payload);
    if(response == -1)alert('Error adding room picture');
  }

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
    setLoading(true);
    const response = await add_hotel(hotelData);
    if(response == -1)alert('Error adding hotel');
    else{
      const responseHotelID = response?.data.hotelID;
      setHotelID(responseHotelID);
      for (const image of hotelImages){
        await handleUploadImage(image, responseHotelID);
      }
      for (const facilities of selectedFacilities){
        const payload : IHotelFacilities = {
          hotelID: responseHotelID,
          facilitiesID: facilities.facilitiesID,
        }
        const response = await add_hotel_facilities(payload);
        if(response == -1)alert('Error adding hotel facilities');
      }
      setLoading(false);
      setStep(2);
    }
  }

  const handleRoomFormSubmit = () => {
    if (!roomData.roomName || !roomData.price || !roomData.occupancy || !roomData.quantity || !roomData.bedType || roomData.images.length === 0) {
      alert('Please fill in all room details.');
      return;
    }

    if(roomData.price < 0 || roomData.occupancy < 0 || roomData.quantity < 0){
      alert('Please fill in valid room details.');
      return;
    }
    roomData.hotelID = hotelID;
    console.log(hotelID)
    setTempRooms((prevRooms) => [...prevRooms, roomData]);
    setRoomData(INITIAL_ROOM_DATA); 
  };

  const handleCompleteAddingRoom = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tempRooms.length === 0) {
      alert('Please add at least one room.');
      return;
    }
    setLoading(true);
    for (const room of tempRooms){
      const response = await add_hotel_room(room);
      if(response == -1)
      {
        alert('Error adding hotel');
        setLoading(false);
        return;
      }
      else{
        const roomId = response?.data.roomID;
        for (const image of room.images){
          await handleUploadRoomImage(image, roomId);
        }
      }
    }
    setLoading(false);
    alert('Hotel added successfully!');
    window.location.reload()
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
            <TextField
              label="Hotel City"
              name="hotelCity"
              value={hotelData?.hotelCity}
              onChange={(e:string) => setHotelData({ ...hotelData, hotelCity: e })}
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
            <Button content="Add Hotel" isLoading={isLoading}/>
          </form>
        );
      case 2:
        return (
        <>
        <div className="room-list">
          {tempRooms.map((room, index) => (
            <div className="room-detail" key={`temp-${index}`}>
              <div className="room-detail-description">
                <p style={{ fontWeight: 'bold' }}>{room.roomName}</p>
                <p>Price : {room.price}</p>
                <p>Occupancy : {room.occupancy}</p>
                <p>BedType : {room.bedType}</p>
              </div>
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
        </div>
          <div>
            <h3>Add Room</h3>
            <form onSubmit={handleCompleteAddingRoom}>
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
              <TextField
                label="Bed Type"
                name="bedType"
                type="text"
                value={roomData?.bedType}
                onChange={(e:string) => setRoomData({ ...roomData, bedType: e })}
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
              <button
                type="button"
                className={`add-button ${isLoading ? 'loading' : ''}`}
                onClick={handleRoomFormSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Room'}
              </button>
              <Button content="Complete Adding Room" isLoading={isLoading}/>
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