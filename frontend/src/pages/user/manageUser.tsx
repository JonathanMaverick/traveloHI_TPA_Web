import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/user-interface";
import get_user from "../../api/user/get_user";
import { FaBan, FaUserCheck } from "react-icons/fa";
import useUser from "../../contexts/user-context";
import "../../styles/pages/user/user-card.scss"
import ban_user from "../../api/user/ban_user";
import unban_user from "../../api/user/unban_user";

export default function ManageUser(){
    
    useEffect(() => {
        document.title = 'Manage User';
        const fetchData = async () => {
          try {
            const response = await get_user();
            if (response !== -1) {
              setUser(response.data);
              console.log(response.data);
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

    return (
        <div>
            <h1>Manage User</h1>
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