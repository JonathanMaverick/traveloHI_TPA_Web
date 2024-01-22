import { IFacility } from "./facility-interface";

export interface IHotelFacilities{
    facilitiesID: number;
    hotelID: number;
    facilities?: IFacility;
}