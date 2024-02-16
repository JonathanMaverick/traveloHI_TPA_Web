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
}