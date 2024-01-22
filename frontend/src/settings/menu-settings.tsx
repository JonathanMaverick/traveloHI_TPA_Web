import AddFlight from "../pages/flight/addFlight";
import HomePage from "../pages/home/home-page";
import { FaHome, FaHotel, FaPlaneDeparture } from "react-icons/fa";
import AddHotel from "../pages/hotel/addHotel";
import ViewHotel from "../pages/hotel/viewHotel";
import { MdAirlines } from "react-icons/md";
import ManageAirline from "../pages/flight/manageAirline";
import ManagePlane from "../pages/flight/managePlane";

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

// export const USER_LIST: IMenu[] = [
export const ADMIN_LIST: IMenu[] = [
    {
        name: "Add Flight",
        path: "/add-flight",
        element: <AddFlight />,
        icon: <FaPlaneDeparture />
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
    }
]