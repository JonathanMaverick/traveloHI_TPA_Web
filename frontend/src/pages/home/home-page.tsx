import { useEffect } from "react";
import PlaneContainer from "./plane-ticket-container";
import TravelohiHeader from "./travelohiHeader";
import HotelContainer from "./hotel-container";
import PromoContainer from "./promo-container";

export default function HomePage(){

    useEffect(() => {
            document.title = "TraveloHI"
        }
    ,[]); 
    
    return(
        <div>
            <PromoContainer />
            <TravelohiHeader />
            <PlaneContainer />
            <HotelContainer />
        </div>
    )
}