import ProfileSidebar from "./profile-sidebar"
import "../../styles/pages/profile/credit-card-page.scss"
import TextField from "../../component/text-field"
import { FormEvent, useEffect, useState } from "react"
import { ICreditCard } from "../../interfaces/user/credit-card.interface";
import get_credit_card from "../../api/creditcard/get_credit_card";
import { useParams } from "react-router-dom";
import add_credit_card from "../../api/creditcard/add_credit_card";
import update_credit_card from "../../api/creditcard/update_credit_card";

export default function CreditCard(){

    const {id} = useParams();
    const [isCreditCardExist, setIsCreditCardExist] = useState<boolean>(true);
    useEffect(() => {
        document.title = "Credit Card"
        const fetchData = async () => {
            const response = await get_credit_card(id!);
            if(response == -1){
                setIsCreditCardExist(false);
                return;
            }
            else{
                console.log(response);
                setCreditCard(response);
            }
        }
        fetchData();
    }
    ,[]);

    const INITIAL_CREDIT_CARD : ICreditCard = {
        cardNumber: "",
        cardHolderName: "",
        expiredDate: "",
        cvv: "",
        postalCode: "",
        userID: 0
    }

    const [creditCard, setCreditCard] = useState<ICreditCard>(INITIAL_CREDIT_CARD);
    const addCreditCard = async (e : FormEvent<HTMLFormElement>) => {  
        e.preventDefault();
        if(isCreditCardExist){
            const response = await update_credit_card(id!, creditCard);
            console.log(response); 
        }
        else{
            creditCard.userID = parseInt(id!);
            const response = await add_credit_card(id!, creditCard);
            console.log(response);
        }
    }

    return(
        <div className="credit-card-page">
            <ProfileSidebar />
            <div className="credit-container">
                <h1>Credit Card</h1>
                <div className="credit-content">
                    <form action="" onSubmit={addCreditCard}>
                        <TextField 
                            label="Card Number" 
                            name="cardnumber" 
                            type="text"
                            value={creditCard.cardNumber || ''}
                            onChange={(e:string) => setCreditCard({...creditCard, cardNumber: e})}
                        />
                        <TextField
                            label="Card Holder"
                            name="cardholder"
                            type="text"
                            value={creditCard.cardHolderName || ''}
                            onChange={(e:string) => setCreditCard({...creditCard, cardHolderName: e})}
                        />
                        <div className="text-field-detail-form">
                            <TextField
                                label="Expiration Date"
                                name="expirationdate"
                                type="date"
                                value={creditCard.expiredDate || ''}
                                onChange={(e:string) => setCreditCard({...creditCard, expiredDate: e})}
                            />
                            <TextField
                                label="CVV"
                                name="cvv"
                                type="number"
                                value={creditCard.cvv || ''}
                                onChange={(e:string) => setCreditCard({...creditCard, cvv: e})}
                            />
                            <TextField
                                label="Postal Code"
                                name="postalcode"
                                type="string"
                                value={creditCard.postalCode || ''}
                                onChange={(e:string) => setCreditCard({...creditCard, postalCode: e})}
                            />
                        </div>
                        {!isCreditCardExist ? (
                            <div className="submit-button">
                                <button type="submit">Add Credit Card</button>
                            </div>
                        ) : (
                            <div className="submit-button">
                                <button type="submit">Update Credit Card</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}