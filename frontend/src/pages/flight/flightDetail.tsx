import { useEffect } from "react";
import { useParams } from "react-router-dom"
import get_flight_schedule_detail from "../../api/flight/schedule/get_flight_schedule_detail";

export default function FlightDetail(){
    const { id } = useParams();
    useEffect(() => {
        document.title = `Flight Detail`;
        const fetchData = async () => {
            try{
                const response = await get_flight_schedule_detail(id!);
                console.log(response);
            }
            catch(error){
                console.error('Error fetching flight data');
            }
        }
        fetchData();
    }, []);

    return(
        <div>
            <h1>Flight Detail</h1>
        </div>
    )
}