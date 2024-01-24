import { useEffect } from "react";
import PlaneContainer from "./plane-ticket-container";

export default function HomePage(){

    useEffect(() => {
            document.title = "TraveloHI"
        }
    ,[]); 
    
    return(
        <div>
            <PlaneContainer />
            <div>
            </div>
        </div>
    )
}