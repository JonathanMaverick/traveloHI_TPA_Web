import "../styles/components/navbar.scss"
import useUser from "../contexts/user-context";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from 'react';
import '../styles/components/sidebar.scss';
import { ADMIN_LIST } from "../settings/menu-settings";

export default function Navbar() {

    const { logout, user } = useUser();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const logoutClick = () => {
        logout();
    }

    const registerClick = () => {
        navigate('/register');
    }

    const sidebarMenuClick = (path: string) => {
        navigate(path);
    }

    return (
        <div className="nav-bar">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                {isSidebarOpen && (
                    <>
                    {ADMIN_LIST.map(({path, icon, name}: any) => (
                        <div onClick={() => sidebarMenuClick(path)}  key={path} className="sidebar-menu">
                            {icon}{name}
                        </div>
                    ))}
                    </>
                )}
            </div>
            <div onClick={() => setSidebarOpen(false)} className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`}></div>
            <RxHamburgerMenu className="logo-icon" size={25} onClick={() => setSidebarOpen(true)}/>
            <Link to="/"><p style={{fontWeight: "bolder", fontSize: "1.2rem"}}>TraveloHI</p></Link>
            <div className="search-bar">
                <FaSearch className="search-icon logo-icon" size={20}/>
                <input type="text" />
            </div>
            <div className="cart hover">
                <FaCartPlus className="logo-icon" size={25}/>
                <p>Pesanan Saya</p>
            </div>
            <div className="flag-container hover">
                <img className="flag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/250px-Flag_of_Indonesia.svg.png" alt="" />
                IDR
                <RiArrowDropDownLine size={25} />
            </div>
            <div className="pay hover">
                Pay
                <RiArrowDropDownLine size={25} />
            </div>
            {user == null ? (
            <>
                <div className="login hover">
                    <CgProfile className="logo-icon" size={25} />
                    <Link to="/login"><p>Log In</p></Link>
                </div>
                <button onClick={registerClick} className="register">Register</button>
            </>
            ) : (
                <button onClick={logoutClick} className="logout">Logout</button>
            )}
        </div>
    )
}