import { IUser } from "../user/user-interface";

export interface IReview{
    reviewID: number;
    review: string;
    userID : number;
    hotelID : number;
    cleanliness : number;
    comfort : number;
    location : number;
    service : number;
    isAnonymous : boolean;
    transactionID : number;
    user? : IUser;
}