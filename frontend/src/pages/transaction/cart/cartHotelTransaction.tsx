import { useEffect, useState } from "react"
import get_hotel_cart from "../../../api/hotel_cart/get_hotel_cart";
import { IHotelTransaction } from "../../../interfaces/hotel/hotel-transaction-interface";
import useUser from "../../../contexts/user-context";
import HotelTransactionCard from "../hotelTransactionCard";

export default function CartHotelTransactions({searchTerm}: {searchTerm:string}){

    const [hotelTransactionList, setHotelTransactionList] = useState<IHotelTransaction[]>([]);
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