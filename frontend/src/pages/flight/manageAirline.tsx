import { useEffect, useState } from "react"
import "../../styles/pages/manage-airline.scss"
import "../../styles/components/navbar.scss"
import AddAirline from "./addAirline"

export default function ManageAirline(){

    useEffect(() => {
        document.title = "Manage Airline"
    }
    ,[])

    const [showAirlineForm, setShowAirlineForm] = useState(false);

    const toggleButton = () => {
        setShowAirlineForm(!showAirlineForm);
    };

    return(
        <div>
            <div className="airline-title">
                <h1>Airline</h1>
                <button onClick={toggleButton}>Add Airline</button>
            </div>
            <div className={`add-airline-form ${showAirlineForm ? 'open' : ''}`}>
                <AddAirline />
            </div>
            <div className={`overlay ${showAirlineForm ? 'open' : ''}`} onClick={() => setShowAirlineForm(false)}></div>
        </div>
    )
}