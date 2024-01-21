import axios from "axios";

const getHotel = async() => {

    try{
        const response =  await axios.get(
            import.meta.env.VITE_API_URL + "/hotel/"
        );
        console.log(response)
        return response;
    }catch(error: any){
        console.log(error)
        alert(error.response.data)
        return -1;
    }
}

export default getHotel;