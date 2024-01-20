import { IBedType } from "./bedtype-interface";

export interface IRoom{
    roomName: string;
    hotelID : number;
    price : number;
    occupancy : number;
    quantity : number;
    images : File[];
    bedType : string;
}