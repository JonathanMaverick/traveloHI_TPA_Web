import { useEffect, useState } from "react"
import get_user_history_flight_transaction from "../../../api/flight_transaction/get_user_history_flight_transaction";
import { IFlightTransaction } from "../../../interfaces/flight/flight-transaction-interface";
import useUser from "../../../contexts/user-context";
import FlightTransactionCard from "../flightTransactionCard";
import "../../../styles/pages/transaction/user_transaction.scss"

export default function HistoryFlightTransaction({searchTerm}: {searchTerm:string}){

    const [flightTransactionList, setFlightTransactionList] = useState<IFlightTransaction[]>([]);
    const {user} = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_user_history_flight_transaction(user?.userID || 0);
                if (response == -1){
                    return;
                }
                else{
                    setFlightTransactionList(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
        };
        fetchData();
    }, []);

    const filteredFlightTransactions = (flightTransactionList || []).filter((transaction) => {
        const airlineName = transaction?.FlightSchedule?.Plane?.Airline?.airlineName || "";
        const flightScheduleCode = transaction?.FlightSchedule?.flightScheduleCode || "";
    
        return (
            airlineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            flightScheduleCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="flight-transaction-list">
            {filteredFlightTransactions.length > 0 ? (
                filteredFlightTransactions.map((f) => (
                    <div key={f.id} className="flight-transaction-card">
                        <FlightTransactionCard ft={f} />
                    </div>
                ))
            ) : (
                <p>No history flight transactions found.</p>
            )}
        </div>
    );
}