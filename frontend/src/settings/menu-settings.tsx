import ManageAirline from "../pages/flight/airline/manageAirline";
import ManageFlightSchedule from "../pages/flight/schedule/manageFlightSchedule";
import ManagePlane from "../pages/flight/plane/managePlane";
import AddHotel from "../pages/hotel/addHotel";
import ViewHotel from "../pages/hotel/viewHotel";
import { FaHome, FaHotel, FaPlaneDeparture, FaUser } from "react-icons/fa";
import { MdAirlines } from "react-icons/md";
import ProfilePage from "../pages/profile/profile-page";
import HomePage from "../pages/home/home-page";
import ManageUser from "../pages/user/manageUser";

export interface IMenu {
    name : string;
    path: string;
    element: JSX.Element;
    icon?: JSX.Element;
    status?: string;
}

export const MENU_LIST: IMenu[] = [  
    {
        name: "Home",
        path: "/",
        element: <HomePage />,
        icon: <FaHome />
    },
]

export const USER_LIST: IMenu[] = [
    {
        name: "Profile",
        path: "/profile/:id",
        element: <ProfilePage />,
        status: "skip"
    }
]

export const ADMIN_LIST: IMenu[] = [
    {
        name: "Manage Flight Schedule",
        path: "/add-flight",
        element: <ManageFlightSchedule />,
        icon: <FaPlaneDeparture />
    },
    {
        name : "Manage Airline",
        path : "/manage-airline",
        element : <ManageAirline />,
        icon : <MdAirlines />
    },
    {
        name : "Manage Airline",
        path : "/airlines/:id",
        element : <ManagePlane />,
        status : "skip"
    },
    {
        name : "Manage User",
        path : "/manage-user",
        element : <ManageUser />,
        icon: <FaUser />
    },
    {
        name: "Add Hotel",
        path: "/add-hotel",
        element: <AddHotel />,
        icon: <FaHotel />
    },
    {
        name: "View Hotel",
        path: "/view-hotel",
        element: <ViewHotel />,
        icon: <FaHotel />
    },
    {
        name: "Profile",
        path: "/profile/:id",
        element: <ProfilePage />,
        status: "skip"
    }
]