import ProfileSidebar from "../../profile/profile-sidebar";
import "../../../styles/pages/transaction/user_transaction.scss"
import { useEffect, useState } from "react";
import HistoryFlightTransaction from "./historyFlightTransaction";
import "../../../styles/pages/transaction/user_transaction.scss"
import HistoryHotelTransactions from "./historyHotelTransaction";

export default function UserHistoryTransaction(){

    const [selectedTransaction, setSelectedTransaction] = useState('flight');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCheckboxChange = (transactionType:string) => {
        setSelectedTransaction(transactionType);
    };

    useEffect(() => {
        document.title = 'History';
    }, []);

    return(
        <div className="user-transaction">
            <ProfileSidebar />
            <div className="user-transaction-container">
                <h2>History</h2>
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
                    {selectedTransaction === 'flight' && <HistoryFlightTransaction searchTerm={searchTerm} />}
                    {selectedTransaction === 'hotel' && <HistoryHotelTransactions searchTerm={searchTerm} />}
                </div>
            </div>
        </div>
    )
}