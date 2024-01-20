import axios from "axios";

const getFacilities = async() => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/hotel/facilities"
        );
        alert(response.data)
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default getFacilities;