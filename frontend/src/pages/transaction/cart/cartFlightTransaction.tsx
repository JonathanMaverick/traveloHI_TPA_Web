import { useEffect, useState } from "react"
import { IFlightTransaction } from "../../../interfaces/flight/flight-transaction-interface";
import useUser from "../../../contexts/user-context";
import FlightTransactionCard from "../flightTransactionCard";
import get_flight_cart from "../../../api/flight/cart/get_flight_cart";
import useCurrency from "../../../contexts/currency-context";
import { documentId } from "firebase/firestore";

export default function CartFlightTransaction({searchTerm}: {searchTerm:string}){

    const [flightTransactionList, setFlightTransactionList] = useState<IFlightTransaction[]>([]);
    const {user} = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_flight_cart(user?.userID?.toString() || '');
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

    function calculateTotalPrice(flightTransactions : IFlightTransaction[]) {
        const validPrices = flightTransactions.filter((f) => typeof f.price === 'number');
        
        const totalPrice = validPrices.reduce((total, f) => total + f.price, 0);
    
        return totalPrice;
    }

    const {currency} = useCurrency();

    return (
        <div className="flight-transaction-list-content">
            <div className="flight-transaction-list">
                {filteredFlightTransactions.length > 0 ? (
                <>
                    {filteredFlightTransactions.map((f) => (
                        <div key={f.id} className="flight-transaction-card">
                            <FlightTransactionCard ft={f} />
                        </div>
                    ))}
                </>
                ) : (
                    <p>No cart flight transactions found.</p>
                )}
            </div>
            {filteredFlightTransactions.length > 0 && (
                <div className="total-price">
                    {currency == "IDR" ? (
                        <p>Total Price: Rp{calculateTotalPrice(filteredFlightTransactions)}</p>
                    ) : 
                    (
                        <p>Total Price: ${(calculateTotalPrice(filteredFlightTransactions) / 14000).toFixed(4)}</p>
                    )
                    }
                </div>
            )}   
        </div>
    );
}