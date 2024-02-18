import { IReview } from "../review/review-interface";
import { IHotelFacilities } from "./hotel-facilities-interface";
import { IHotelPicture } from "./hotel-picture-interface";
import { IRoom } from "./room-interface";

export interface IHotel{
    hotelID? : number;
    hotelName: string;
    hotelDescription : string;
    hotelAddress : string;
    hotelCity : string;
    hotelPictures : IHotelPicture[];
    hotelFacilities?: IHotelFacilities[];
    hotelRating? : number;
    roomAvailable? : number;
    reviewCount? : number;
    rooms? : IRoom[];
    reviews?: IReview[];
}