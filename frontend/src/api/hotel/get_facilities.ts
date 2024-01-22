import axios from "axios";

const get_facilities = async() => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/hotel/facilities"
        );
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default get_facilities;