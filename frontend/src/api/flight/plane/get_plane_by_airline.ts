import axios from "axios";

const get_plane_by_airline = async(airlineID : string) => {
    try{
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/flight/airline/plane/" + airlineID
        );
        return response;
    }catch(error: any){
        return -1;
    }
}

export default get_plane_by_airline;