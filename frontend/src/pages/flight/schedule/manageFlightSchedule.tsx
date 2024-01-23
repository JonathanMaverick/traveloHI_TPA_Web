import { useEffect, useState } from "react";
import "../../../styles/pages/manage-plane.scss";
import AddFlightSchedule from "./addFlightSchedule";

export default function ManageFlightSchedule(){

    useEffect(() => {
        document.title = "Manage Flight Schedule";
    }
    , []);

    const [showScheduleForm, setShowScheduleForm ] = useState(false);
    const toggleButton = () => {
        setShowScheduleForm(!showScheduleForm);
    };

    return(
        <div>
            <div className="airline-title">
                <h1>Flight Schedule</h1>
                <button onClick={toggleButton}>Add Flight Schedule</button>
            </div>
            <div className={`add-form ${showScheduleForm ? 'open' : ''}`}>
                <AddFlightSchedule />
            </div>
            <div className={`overlay ${showScheduleForm ? 'open' : ''}`} onClick={() => setShowScheduleForm(false)}></div>
        </div>
    )
}
