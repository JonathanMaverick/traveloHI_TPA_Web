import { IHotel } from "../hotel/hotel-interface";
import { IUser } from "../user/user-interface";
import { IRoom } from "./room-interface";

export interface IHotelCart {
    id: number;
    hotelID: number;
    roomID: number;
    userID: number;
    price : number;
    checkInDate: string;
    checkOutDate: string;
    paymentID?: number;
    promoCode?: string;

    Hotel?: IHotel;
    Room?: IRoom;
    User?: IUser;
}