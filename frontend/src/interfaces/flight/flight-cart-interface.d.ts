export interface IFlightCart {
    id? : number;
    flightScheduleID?: number;
    seatID?: number;
    userID?: number;
    price?: number;

    FlightSchedule? : IFlightSchedule;
    Seat? : ISeat;
    User? : IUser;
}