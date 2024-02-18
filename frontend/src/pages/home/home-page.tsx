import { useEffect } from "react";
import PlaneContainer from "./plane-ticket-container";
import TravelohiHeader from "./travelohiHeader";
import HotelContainer from "./hotel-container";
import PromoContainer from "./promo-container";
import "../../styles/pages/home/home-page.scss";

export default function HomePage(){

    useEffect(() => {
            document.title = "TraveloHI"
        }
    ,[]); 
    
    return(
        <div className="home-page">
            <PromoContainer />
            <TravelohiHeader />
            <PlaneContainer />
            <HotelContainer />
        </div>
    )
}