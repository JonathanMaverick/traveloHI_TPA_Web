import ProfileSidebar from "./profile-sidebar"
import "../../styles/pages/profile/credit-card-page.scss"
import TextField from "../../component/text-field"

export default function CreditCard(){
    return(
        <div className="credit-card-page">
            <ProfileSidebar />
            <div className="credit-container">
                <h1>Credit Card</h1>
                <div className="credit-content">
                    <form action="">
                        <TextField 
                            label="Card Number" 
                            name="cardnumber" 
                            type="number"
                        ></TextField>
                        <TextField
                            label="Card Holder"
                            name="cardholder"
                            type="text"
                        />
                        <div className="text-field-detail-form">
                            <TextField
                                label="Expiration Date"
                                name="expirationdate"
                                type="date"
                            />
                            <TextField
                                label="CVV"
                                name="cvv"
                                type="number"
                            />
                            <TextField
                                label="Postal Code"
                                name="postalcode"
                                type="number"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}