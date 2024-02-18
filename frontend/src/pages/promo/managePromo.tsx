import { useEffect, useState } from "react"
import AddPromo from "./addPromo";
import { IPromo } from "../../interfaces/promo/promo-interface";
import get_promos from "../../api/promo/get_promos";
import "../../styles/pages/promo/manage_promo.scss"
import PromoCard from "./promoCard";

export default function ManagePromo(){

    useEffect(() => {
        document.title = "Manage Promo";
        const fetchData = async () => {
            const response = await get_promos();
            if(response != -1){
                setPromos(response.data.data);
            }
        }
        fetchData();
    }, []);

    const [promos, setPromos] = useState<IPromo[]>([]); 
    const [showPromoForm, setShowPromoForm ] = useState(false);

    const toggleButton = () => {
        setShowPromoForm(!showPromoForm);
    };

    return(
        <div>
            <div className="airline-title">
                <h1>Promo</h1>
                <button onClick={toggleButton}>Add Promo</button>
            </div>
            <div className={`add-form ${showPromoForm ? 'open' : ''}`}>
                <AddPromo />
            </div>
            <div className={`overlay ${showPromoForm ? 'open' : ''}`} onClick={() => setShowPromoForm(false)}></div>
            <div className="promo-content">
                {promos.length === 0 && <h2>No promos available</h2>}
                {promos.map((promo, index) => {
                    return(
                        <PromoCard promo={promo} key={index} />
                    )
                })}
            </div>
        </div>
    )
}