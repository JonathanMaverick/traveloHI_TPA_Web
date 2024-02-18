import { useEffect, useState } from "react"
import useUser from "../../../contexts/user-context";
import get_flight_cart from "../../../api/flight/cart/get_flight_cart";
import useCurrency from "../../../contexts/currency-context";
import { IFlightCart } from "../../../interfaces/flight/flight-cart-interface";
import FlightCartTransactionCard from "./flightCartTransactionCard";
import get_user_expired_flight_cart from "../../../api/flight/cart/get_user_expired_flight_cart";

export default function CartFlightTransaction({searchTerm}: {searchTerm:string}){

    const [flightTransactionList, setFlightTransactionList] = useState<IFlightCart[]>([]);
    const [expiredFlightTransactionList, setExpiredFlightTransactionList] = useState<IFlightCart[]>([]);
    const {user} = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_flight_cart(user?.userID?.toString() || '');
                const response2 = await get_user_expired_flight_cart(user?.userID?.toString() || '');
                if (response == -1){
                    return;
                }
                else{
                    setFlightTransactionList(response.data);
                }
                if (response2 == -1){
                    return;
                }
                else{
                    setExpiredFlightTransactionList(response2.data);
                }
            } catch (error) {
                console.error('Error fetching hotel data');
            }
        };
        fetchData();
    }, []);

    const filteredFlightTransactions = (
        [...(flightTransactionList || []), ...(expiredFlightTransactionList || [])]
      ).filter((transaction) => {
        const airlineName =
          transaction?.FlightSchedule?.Plane?.Airline?.airlineName || "";
        const flightScheduleCode =
          transaction?.FlightSchedule?.flightScheduleCode || "";
      
        return (
          airlineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          flightScheduleCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    function calculateTotalPrice(flightTransactions : IFlightCart[]) {
        const validPrices = flightTransactions.filter((f) => typeof f.price === 'number' && !expiredFlightTransactionList.includes(f));

        const totalPrice = validPrices.reduce((total, f) => {
            return total + (f.price || 0); 
        }, 0);
    
        return totalPrice;
    }

    const {currency} = useCurrency();

    return (
        <div className="flight-transaction-list-content">
          <div className="flight-transaction-list">
            {filteredFlightTransactions && filteredFlightTransactions.length > 0 ? (
              <>
                {filteredFlightTransactions.map((f) => (
                  <div key={f.id} className="flight-transaction-card">
                    <FlightCartTransactionCard ft={f} isExpired={expiredFlightTransactionList.includes(f)} />
                  </div>
                ))}
              </>
            ) : (
              <p>No flight transactions found.</p>
            )}
          </div>
          <div className="check-out-content">
            {filteredFlightTransactions && filteredFlightTransactions.length > 0 && (
              <div className="total-price">
                {currency === "IDR" ? (
                  <p>Total Price: Rp{calculateTotalPrice(filteredFlightTransactions)}</p>
                ) : (
                  <p>Total Price: ${(calculateTotalPrice(filteredFlightTransactions) / 14000).toFixed(4)}</p>
                )}
              </div>
            )}
          </div>
        </div>
    );
}