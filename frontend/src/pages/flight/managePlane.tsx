import { useState } from "react";
import AddPlane from "./addPlane";

export default function ManagePlane(){

    // const [plane, setPlane] = useState<IAirline[]>([]); 
    const [showPlaneForm, setShowPlaneForm] = useState(false);
    const toggleButton = () => {
        setShowPlaneForm(!showPlaneForm);
    };

    return(
        <div>
            <div className="airline-title">
                <h1>Plane</h1>
                <button onClick={toggleButton}>Add Plane</button>
            </div>
            <div className={`add-form ${showPlaneForm ? 'open' : ''}`}>
                <AddPlane />
            </div>
            <div className={`overlay ${showPlaneForm ? 'open' : ''}`} onClick={() => setShowPlaneForm(false)}></div>
        </div>
    )
}
