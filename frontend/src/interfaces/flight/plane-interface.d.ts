import { IAirline } from "./airline-interface";

export interface IPlane{
    planeID? : number;
    planeCode: string;
    airlineID? : number; 
    economySeats : number;
    businessSeats : number;

    Airline? : IAirline;
}