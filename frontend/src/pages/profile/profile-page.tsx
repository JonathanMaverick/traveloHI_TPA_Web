import { FormEvent, useEffect, useState } from "react";
import "../../styles/pages/profile/profile-page.scss"
import ProfileSidebar from "./profile-sidebar";
import TextField from "../../component/text-field";
import useUser from "../../contexts/user-context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../settings/firebase";
import { useParams } from "react-router-dom";
import update_user from "../../api/user/update_user";
import { IUser } from "../../interfaces/user/user-interface";
import TextArea from "../../component/text-area";

export default function ProfilePage(){

    useEffect(() => {
            document.title = "Profile"
            setTempUser(user || USER_INITIAL_STATE);
        }
    ,[]);

    const USER_INITIAL_STATE:IUser = {
        email: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        password: "",  
        subscribedToNewsletter: false,
        profilePicture: "",  
        personalSecurityAnswer: "",
        securityQuestion: "",
        status: "",  
        role: "",    
        wallet: 0     
    };

    const {id} = useParams();
    const {user , logout} = useUser();
    const [tempUser, setTempUser] = useState<IUser>(USER_INITIAL_STATE);

    const updateProfile = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(tempUser.profilePictureFile){
            const storageRef = ref(storage, `profile-pictures/${tempUser.email}`);
            await uploadBytes(storageRef, tempUser.profilePictureFile);
            const url = await getDownloadURL(storageRef);
            tempUser.profilePicture = url;
        }
        const response = await update_user(id!, tempUser);
        if(response == -1){
            return;
        }
        else{
            alert(response.data);
            window.location.reload()
        }
    }

    const handleLogout = () => {
        logout();
    }
    
    return(
        <div className="profile-page">
            <ProfileSidebar />
            <div className="profile-container">
                <h2>Settings</h2>
                <div className="profile-content">
                    <div className="personal-information">
                        <p>Personal Information</p>
                    </div>
                    <form className="personal-form" onSubmit={updateProfile}>
                        <div className="name-form">
                            <TextField 
                                label="First Name" 
                                name="firstname" 
                                value={tempUser?.firstName} 
                                onChange={(e:string)=> setTempUser({...tempUser, firstName: e})}
                            />
                            <TextField 
                                label="Last Name"
                                name="lastname" 
                                value={tempUser?.lastName}
                                onChange={(e:string)=> setTempUser({...tempUser, lastName: e})}
                            />
                        </div>
                        <div className="text-field">
                            <label htmlFor="profile">Profile Picture</label>
                            <input
                                id="profile"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={({ target: { files } }) => {
                                    setTempUser({ ...tempUser, profilePictureFile: files![0] });
                                }}
                            />
                        </div>
                        <TextField 
                            label="DOB" 
                            name="dob" 
                            type="date"
                            value={tempUser?.dob}
                            onChange={(e:string)=> setTempUser({...tempUser, dob: e})}
                        />
                        <TextField
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={tempUser?.phoneNumber}
                            onChange={(e:string)=> setTempUser({...tempUser, phoneNumber: e})}
                        />
                        <div className="gender-container">
                            <p>Gender</p>
                            <div className="gender-option">
                                <div className="gender-box">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="Male"
                                        checked={tempUser?.gender === 'Male'}
                                        onChange={(e) => setTempUser({ ...tempUser, gender: e.target.value })}
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="gender-box">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="Female"
                                        checked={tempUser?.gender === 'Female'}
                                        onChange={(e) => setTempUser({ ...tempUser, gender: e.target.value })}
                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>
                        <TextArea
                            label="Address"
                            name="address"
                            value={tempUser?.address}
                            placeholder="Address"
                            onChange={(e:string) => setTempUser({ ...tempUser, address: e })}
                        />
                        <div className="subscribe-container">
                            <input 
                                type="checkbox" 
                                id="subscribe" 
                                name="subscribe" 
                                checked={tempUser?.subscribedToNewsletter}
                                onChange={(e)=> setTempUser({...tempUser, subscribedToNewsletter: e.target.checked})}
                            />
                            <label htmlFor="subscribe"> Subscribe to newsletter </label>
                        </div>
                        <div className="profile-button">
                            <button type="button" onClick={handleLogout} style={{backgroundColor: "red"}}>Log out</button>
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}