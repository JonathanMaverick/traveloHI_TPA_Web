import { useEffect, useState } from "react"
import useUser from "../../../contexts/user-context";
import get_user_history_hotel_transaction from "../../../api/hotel_transaction/get_user_history_hotel_transaction";
import HotelTransactionCard from "../hotelTransactionCard";
import "../../../styles/pages/transaction/user_transaction.scss"
import { IHotelTransaction } from "../../../interfaces/hotel/hotel-transaction-interface";

export default function HistoryHotelTransactions({searchTerm}: {searchTerm:string}){

    const [hotelTransactionList, setHotelTransactionList] = useState<IHotelTransaction[]>([]);
    const {user} = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_user_history_hotel_transaction(user?.userID || 0);
                if (response == -1){
                    return;
                }
                else{
                    console.log(response.data.data)
                    setHotelTransactionList(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
        };
        fetchData();
    }, []);

    const filteredHotelTransactions = (hotelTransactionList || []).filter((transaction) => {
        const hotelName = transaction?.Hotel?.hotelName || "";
    
        return (
            hotelName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="hotel-transaction-list">
            {filteredHotelTransactions.length > 0 ? (
                filteredHotelTransactions.map((f) => (
                    <div key={f.id} className="hotel-transaction-card">
                        <HotelTransactionCard transaction={f} />
                    </div>
                ))
            ) : (
                <p>No matching hotel transactions found.</p>
            )}
        </div>
    );
}