import { useEffect, useState } from "react";
import AddPlane from "./addPlane";
import "../../../styles/pages/manage-plane.scss"
import { useParams } from "react-router-dom";
import get_plane_by_airline from "../../../api/flight/plane/get_plane_by_airline";
import { IPlane } from "../../../interfaces/flight/plane-interface";

export default function ManagePlane(){

    useEffect(() => {
        document.title = "Manage Plane";
        const fetchData = async () => {
            try {
                const response = await get_plane_by_airline(id!);
                if(response != -1){
                    setPlanes(response.data.planes);
                }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchData();
    }
    , []);

    const [planes, setPlanes] = useState<IPlane[]>([]); 
    const [showPlaneForm, setShowPlaneForm] = useState(false);
    const toggleButton = () => {
        setShowPlaneForm(!showPlaneForm);
    };
    const { id } = useParams();

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
            <div className="planes-list">
            {planes.map((plane) => (
                <div key={plane.planeID} className="plane-card">
                    <h2>{plane.planeCode}</h2>
                    <div className="seats-info">
                        <p>Economy Seats: {plane.economySeats}</p>
                        <p>Business Seats: {plane.businessSeats}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
