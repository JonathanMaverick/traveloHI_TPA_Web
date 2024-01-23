import { useEffect, useState } from "react"
import "../../../styles/pages/manage-airline.scss"
import "../../../styles/components/navbar.scss"
import AddAirline from "./addAirline"
import { IAirline } from "../../../interfaces/flight/airline-interface"
import { Link } from "react-router-dom"
import get_airline from "../../../api/flight/airline/get_airline"

export default function ManageAirline(){

    useEffect(() => {
        document.title = "Manage Airline"
        const fetchData = async () => {
            try {
              const response = await get_airline();
              if(response != -1){
                setAirline(response.data.airlines);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          fetchData();
    }
    ,[])

    const [airline, setAirline] = useState<IAirline[]>([]); 
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
            <div className={`add-form ${showAirlineForm ? 'open' : ''}`}>
                <AddAirline />
            </div>
            <div className={`overlay ${showAirlineForm ? 'open' : ''}`} onClick={() => setShowAirlineForm(false)}></div>
            <div className="airline-list">
                {airline.length > 0 ? (
                    <div className="airline-container">
                        {airline.map((airlineItem) => (
                            <Link key={airlineItem.airlineID} to={`/admin/airlines/${airlineItem.airlineID}`} className="airline-item">
                              <div className="airline-image-container">
                                <img src={airlineItem.airlineLogo} alt="" />
                              </div>
                                <p>{airlineItem.airlineName}</p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No airlines available</p>
                )}
            </div>
        </div>
    )
}