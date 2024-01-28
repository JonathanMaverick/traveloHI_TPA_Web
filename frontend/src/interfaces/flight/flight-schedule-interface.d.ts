import { IAirport } from "./airport-interface";
import { IPlane } from "./plane-interface";

export interface IFlightSchedule {
    flightScheduleID? : number;
    flightScheduleCode : string;
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
    Seats? : ISeat[];
}