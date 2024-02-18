import { FaPencilAlt } from "react-icons/fa";
import { IPromo } from "../../interfaces/promo/promo-interface";
import { useState } from "react";
import UpdatePromo from "./updatePromo";

export default function PromoCard({promo} : {promo : IPromo}){

    const toggleButton = () => {
        setShowPromoForm(!showPromoForm);
    };
    const [showPromoForm, setShowPromoForm] = useState(false);

    return(
        <div className="promo-card">
            <div onClick={toggleButton} className="edit-button">
                <FaPencilAlt />
            </div>
            <div className={`add-form ${showPromoForm ? 'open' : ''}`}>
                <UpdatePromo updatePromo={promo} />
            </div>
            <div className={`overlay ${showPromoForm ? 'open' : ''}`} onClick={() => setShowPromoForm(false)}></div>
            <img src={promo.promoPicture} alt="promo" />
            <div>
                <h2>{promo.promoCode}</h2>
                <p>{promo.promoDiscount}% off</p>
            </div>
        </div>
    )
}