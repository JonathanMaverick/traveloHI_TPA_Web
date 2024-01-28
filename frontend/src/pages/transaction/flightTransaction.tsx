import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import get_user_flight_transaction from "../../api/transaction/get_user_flight_transaction";
import useUser from "../../contexts/user-context";
import { IFlightTransaction } from "../../interfaces/flight/flight-transaction-interface";

export default function FlightTransactions(){

    const {user} = useUser();
    const fetchData = async () => {
        try {
            const response = await get_user_flight_transaction(user?.userID || 0);
            if (response == -1){
                return;
            }
            else{
                setFlightTransactionList(response.data);
            }
        } catch (error) {
            console.error('Error fetching hotel data');
        }
      };
    useEffect(() => {
        fetchData();
    }, []);

    const [flightTransactionList, setFlightTransactionList] = useState<IFlightTransaction[]>([])


    return(
        <div>
            {flightTransactionList.map((f) => (
                <div key={f.id}>
                    {f.Seat && <p>{f.Seat.seatNumber}</p>}
                </div>
            ))}
        </div>
    )
}