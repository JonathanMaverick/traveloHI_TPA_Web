import { IPayment } from "../transaction/payment/payment-interface";
import { IUser } from "../user/user-interface";
import { IFlightSchedule } from "./flight-schedule-interface";
import { ISeat } from "./seats-interface";

export interface IFlightTransaction {
    id? : number;
    flightScheduleID?: number;
    seatID?: number;
    userID?: number;
    price?: number;
    paymentID?: number;
    addOnLuggage?: boolean;

    FlightSchedule? : IFlightSchedule;
    Seat? : ISeat;
    User? : IUser;
    Payment? : IPayment;
}
