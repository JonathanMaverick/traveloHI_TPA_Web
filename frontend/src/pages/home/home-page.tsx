import { useEffect } from "react";
import PlaneContainer from "./plane-ticket-container";
import TravelohiHeader from "./travelohiHeader";

export default function HomePage(){

    useEffect(() => {
            document.title = "TraveloHI"
        }
    ,[]); 
    
    return(
        <div>
            <TravelohiHeader />
            <PlaneContainer />
            <div>
            </div>
        </div>
    )
}