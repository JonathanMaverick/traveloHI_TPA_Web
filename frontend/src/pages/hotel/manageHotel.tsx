import { useEffect, useState } from "react";
import "../../styles/pages/user/manage-user.scss"
import AddHotel from "./addHotel";
import ViewHotel from "./viewHotel";

export default function ManageHotel(){
    
    useEffect(() => {
        document.title = 'Manage Hotel';
      }
    , []);


    const [showAddHotelForm, setshowAddHotelForm] = useState(false);
    const toggleButton = () => {
        setshowAddHotelForm(!showAddHotelForm);
    };

    return (
        <div>
            <div className="manage-user-title">
                <h1>Manage Hotel</h1>
                <button onClick={toggleButton}>Add Hotel</button>
            </div>
            <div className={`add-form ${showAddHotelForm ? 'open' : ''}`}>
                <AddHotel />
            </div>
            <div className={`overlay ${showAddHotelForm ? 'open' : ''}`} onClick={() => setshowAddHotelForm(false)}></div>
            <div>
                <ViewHotel />
            </div>
        </div>
    );
}