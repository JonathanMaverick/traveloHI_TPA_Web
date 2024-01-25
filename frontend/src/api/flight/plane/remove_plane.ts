import axios from "axios";

const remove_plane = async(planeID : string) => {
    try{
        const response = await axios.delete(
            import.meta.env.VITE_API_URL + "/flight/plane/" + planeID
        );
        alert("Plane deleted successfully")
        return response;
    }catch(error: any){
        alert("Plane is in use, cannot delete")
        return -1;
    }
}

export default remove_plane;