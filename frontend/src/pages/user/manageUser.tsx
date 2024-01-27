import { useEffect, useState } from "react";
import get_user from "../../api/user/get_user";
import { FaBan, FaUserCheck } from "react-icons/fa";
import useUser from "../../contexts/user-context";
import "../../styles/pages/user/manage-user.scss"
import ban_user from "../../api/user/ban_user";
import unban_user from "../../api/user/unban_user";
import SendNewsletterUser from "./SendNewsletterUser";
import { IUser } from "../../interfaces/user/user-interface";

export default function ManageUser(){
    
    useEffect(() => {
        document.title = 'Manage User';
        const fetchData = async () => {
          try {
            const response = await get_user();
            if (response !== -1) {
              setUser(response.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }
    , []);

    const banUser = async(user: IUser) => {
        await ban_user(user);
        window.location.reload();
    }

    const unbanUser = async(user: IUser) => {
        await unban_user(user);
        window.location.reload();
    }

    const [users, setUser] = useState<IUser[]>([]);
    const {user} = useUser()
    const [showSendMessageUser, setShowSendMessageUser] = useState(false);
    const toggleButton = () => {
        setShowSendMessageUser(!showSendMessageUser);
    };

    return (
        <div>
            <div className="manage-user-title">
                <h1>Manage User</h1>
                <button onClick={toggleButton}>Send Message</button>
            </div>
            <div className={`add-form ${showSendMessageUser ? 'open' : ''}`}>
                <SendNewsletterUser />
            </div>
            <div className={`overlay ${showSendMessageUser ? 'open' : ''}`} onClick={() => setShowSendMessageUser(false)}></div>
            <div>
                {users.map((u: IUser) => (
                    user?.email !== u.email && (
                        <div key={u.email} className="user-card">
                            <div className="user-card-detail">
                                <p>{u.email}</p>
                                <p>{u.firstName} {u.lastName}</p>
                                <p>{u.status}</p>
                            </div>
                            {u.status === "banned" ? (
                                <button className="unban-user" onClick={() => unbanUser(u)}><FaUserCheck /></button>
                            ) : (
                                <button onClick={() => banUser(u)}><FaBan /></button>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}