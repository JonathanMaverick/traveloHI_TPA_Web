import ProfileSidebar from "../../profile/profile-sidebar";
import "../../../styles/pages/transaction/user_transaction.scss"
import { useEffect, useState } from "react";
import CartFlightTransaction from "./cartFlightTransaction";
import CartHotelTransactions from "./cartHotelTransaction";

export default function UserCartTransaction(){

    const [selectedTransaction, setSelectedTransaction] = useState('flight');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCheckboxChange = (transactionType:string) => {
        setSelectedTransaction(transactionType);
    };

    useEffect(() => {
        document.title = 'Cart';
    }, []);

    return(
        <div className="user-transaction">
            <ProfileSidebar />
            <div className="user-transaction-container">
                <h2>Cart</h2>
                <div className="user-transaction-content">
                    <div className="filter-hotel-flight">
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedTransaction === 'flight'}
                                onChange={() => handleCheckboxChange('flight')}
                            />
                            Show Flights
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedTransaction === 'hotel'}
                                onChange={() => handleCheckboxChange('hotel')}
                            />
                            Show Hotels
                        </label>
                    </div>
                    <div className="text-field-search">
                        <input type="text" 
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {selectedTransaction === 'flight' && <CartFlightTransaction searchTerm={searchTerm} />}
                    {selectedTransaction === 'hotel' && <CartHotelTransactions searchTerm={searchTerm}/>}
                </div>
            </div>
        </div>
    )
}