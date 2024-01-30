import { IBedType } from "./bedtype-interface";
import { IRoomPicture } from "./room-picture-interface";

export interface IRoom{
    roomName: string;
    hotelID : number;
    price : number;
    occupancy : number;
    quantity : number;
    images : File[];
    bedType : string;
    roomPicture : IRoomPicture[];
}