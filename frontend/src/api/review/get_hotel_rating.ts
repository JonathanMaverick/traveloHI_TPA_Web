import axios from "axios";

const get_hotel_rating = async (hotel_id: string) => {
    try {
        const response = await axios.get(
            import.meta.env.VITE_API_URL + "/review/rating/" + hotel_id
        );
        return response;
    } catch (error: any) {
        alert(error.response.data.message);
        return -1;
    }
};

export default get_hotel_rating;