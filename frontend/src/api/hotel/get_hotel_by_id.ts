import axios from "axios";

const get_hotel_by_id = async(hotelId : string) => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/hotel/" + hotelId
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_hotel_by_id;