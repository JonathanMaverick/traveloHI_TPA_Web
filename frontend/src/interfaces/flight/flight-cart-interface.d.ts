export interface IFlightCart {
    id? : number;
    flightScheduleID?: number;
    seatID?: number;
    userID?: number;
    paymentID?: number;
    price: number;
    promoCode?: string;
    addOnLuggage?: boolean;

    FlightSchedule? : IFlightSchedule;
    Seat? : ISeat;
    User? : IUser;
}