import { IHotelFacilities } from "./hotel-facilities-interface";
import { IHotelPicture } from "./hotel-picture-interface";

export interface IHotel{
    hotelID? : number;
    hotelName: string;
    hotelDescription : string;
    hotelAddress : string;
    hotelCity : string;
    hotelPictures?: IHotelPicture[];
    hotelFacilities?: IHotelFacilities[];
}