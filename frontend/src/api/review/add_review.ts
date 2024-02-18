import axios from "axios";
import { IReview } from "../../interfaces/review/review-interface";

const add_review = async(review : IReview) => {
    try{
        const response = await axios.post(
            import.meta.env.VITE_API_URL + "/review/"
            , review
        );
        return response;
    }catch(error: any){
        alert(error.response.data.message)
        return -1;
    }
}

export default add_review;