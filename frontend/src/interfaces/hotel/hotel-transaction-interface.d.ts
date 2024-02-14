import { IHotel } from "../hotel/hotel-interface";
import { IPayment } from "../transaction/payment/payment-interface";
import { IUser } from "../user/user-interface";
import { IRoom } from "./room-interface";

export interface IHotelTransaction {
    id? : number;
    hotelID?: number;
    roomID?: number;
    userID?: number;
    price: number;
    paymentID?: number;
    checkInDate: string;
    checkOutDate: string;
    isReviewed: boolean;

    Hotel? : IHotel;
    Room? : IRoom;
    User? : IUser;
    Payment? : IPayment;
}
