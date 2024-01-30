import { IHotel } from "../hotel/hotel-interface";
import { IPayment } from "../transaction/payment/payment-interface";
import { IUser } from "../user/user-interface";
import { IFlightSchedule } from "./flight-schedule-interface";

export interface IHotelTransaction {
    id? : number;
    hotelID?: number;
    roomID?: number;
    userID?: number;
    price: number;
    paymentID?: number;
    checkInDate: string;
    checkOutDate: string;

    Hotel? : IHotel;
    Room? : IRoom;
    User? : IUser;
    Payment? : IPayment;
}
