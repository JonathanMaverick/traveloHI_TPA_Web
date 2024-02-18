export interface IUser {
    userID?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    profilePicture?: string;
    profilePictureFile? : File;
    personalSecurityAnswer?: string;
    securityQuestion?: string;
    subscribedToNewsletter?: boolean;
    status?: string;
    role?: string;
    wallet: number;
    phoneNumber?: string;
    address?: string;
  }