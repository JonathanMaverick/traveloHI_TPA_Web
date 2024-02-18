import { useEffect, useState } from "react"
import get_hotel_cart from "../../../api/hotel_cart/get_hotel_cart";
import useUser from "../../../contexts/user-context";
import HotelCartTransactionCard from "./hotelCartTransactionCard";
import { IHotelCart } from "../../../interfaces/hotel/hotel-cart-interface";
import useCurrency from "../../../contexts/currency-context";

export default function CartHotelTransactions({searchTerm}: {searchTerm:string}){

    const [hotelTransactionList, setHotelTransactionList] = useState<IHotelCart[]>([]);
    const {user} = useUser();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get_hotel_cart(user?.userID?.toString() || '');
                if (response == -1){
                    return;
                }
                else{
                    console.log(response.data)
                    setHotelTransactionList(response.data);
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

    function calculateTotalPrice(hotelCart : IHotelCart[]) {
        const validPrices = hotelCart.filter((h) => typeof h.price === 'number');
        
        const totalPrice = validPrices.reduce((total, h) => total + h.price, 0);
    
        return totalPrice;
    }
    const {currency} = useCurrency();

    return (
        <div className="hotel-transaction-list-content">
            <div className="hotel-transaction-list">
            {filteredHotelTransactions.length > 0 ? (
                filteredHotelTransactions.map((f) => (
                    <div key={f.id} className="hotel-transaction-card">
                        <HotelCartTransactionCard transaction={f} />
                    </div>
                ))
                ) : (
                    <p>No matching hotel transactions found.</p>
                )}
            </div>
            <div className="check-out-content">
                {hotelTransactionList.length > 0 && (
                    <div className="total-price">
                        {currency == "IDR" ? (
                            <p>Total Price: Rp{calculateTotalPrice(filteredHotelTransactions)}</p>
                        ) : 
                        (
                            <p>Total Price: ${(calculateTotalPrice(filteredHotelTransactions) / 14000).toFixed(4)}</p>
                        )
                        }
                    </div>
                )}   
                <button>Check Out</button>
            </div>
    </div>
    );
}