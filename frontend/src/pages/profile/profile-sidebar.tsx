import { BsEnvelopePaper } from "react-icons/bs";
import useUser from "../../contexts/user-context";
import { IoIosSettings, IoMdCard } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";

export default function ProfileSidebar(){

    const {user} = useUser();

    return(
        <div className="profile-information">
            <div className="profile-information-detail">
                <img src={user?.profilePicture} alt="" />
                <div className="user-profile">
                    <p>{user?.firstName} {user?.lastName}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <div className="profile-information-option">
                <IoMdCard className="profile-icon"/><p>My Card</p>
            </div>
            <div className="profile-information-option">
                <BsEnvelopePaper className="profile-icon"/><p>Order</p>
            </div>
            <div className="profile-information-option">
                <IoNewspaper className="profile-icon"/><p>History</p>
            </div>
            <div className="profile-information-option">
                <IoIosSettings className="profile-icon"/><p>Profile</p>
            </div>
        </div>
    )
}