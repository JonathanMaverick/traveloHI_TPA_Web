import { useEffect } from "react";
import "../../styles/pages/profile/profile-page.scss"
import ProfileSidebar from "./profile-sidebar";
import TextField from "../../component/text-field";

export default function ProfilePage(){

    useEffect(() => {
            document.title = "Profile"
        }
    ,[]);

    
    return(
        <div className="profile-page">
            <ProfileSidebar />
            <div className="profile-container">
                <h2>Settings</h2>
                <div className="profile-content">
                    <div className="personal-information">
                        <p>Personal Information</p>
                    </div>
                    <div className="personal-form">
                        <div className="name-form">
                            <TextField label="First Name" name="firstname" />
                            <TextField label="Last Name" name="lastname" />
                        </div>
                        <div className="text-field">
                            <label htmlFor="profile">Profile Picture</label>
                            <input
                                id="profile"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                            />
                        </div>
                        <TextField 
                            label="DOB" 
                            name="dob" 
                            type="date"
                        />
                        <div className="subscribe-container">
                            <input 
                                type="checkbox" 
                                id="subscribe" 
                                name="subscribe" 
                                value="Subscribe"
                            />
                            <label htmlFor="subscribe"> Subscribe to newsletter </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}