export interface IFlightSchedule {
    flightDetailID? : number;
    flightScheduleID : number;
    planeID : number;
    originAirportID : number;
    destinationAirportID : number;
    businessPrice : number;
    economyPrice : number;
    arrivalTime : string;
    departureTime : string;

    Plane? : IPlane;
    OriginAirport? : IAirport;
    DestinationAirport? : IAirport;
}