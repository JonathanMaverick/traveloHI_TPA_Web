import ManageAirline from "../pages/flight/airline/manageAirline";
import ManageFlightSchedule from "../pages/flight/schedule/manageFlightSchedule";
import ManagePlane from "../pages/flight/plane/managePlane";
import { FaGamepad, FaHome, FaHotel, FaPlaneDeparture, FaUser } from "react-icons/fa";
import { MdAirlines } from "react-icons/md";
import ProfilePage from "../pages/profile/profile-page";
import HomePage from "../pages/home/home-page";
import ManageUser from "../pages/user/manageUser";
import ManageHotel from "../pages/hotel/manageHotel";
import SearchPage from "../pages/search/searchPage";
import FlightDetail from "../pages/flight/flightDetail";
import UserTransaction from "../pages/transaction/userTransaction";
import UserHistoryTransaction from "../pages/transaction/history/userHistoryTransaction";
import Game from "../pages/game/game";
import CreditCard from "../pages/profile/credit-card-page";
import UserCartTransaction from "../pages/transaction/cart/userCartTransaction";
import HotelDetail from "../pages/hotel/hotelDetail";
import { RiCoupon2Fill } from "react-icons/ri";
import ManagePromo from "../pages/promo/managePromo";

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
    {
        name : "Search",
        path : "/search/:query",
        element : <SearchPage />,
        status : "skip"
    },
    {
        name : "Flight Detail",
        path : "/flight-detail/:id",
        element : <FlightDetail />,
        status : "skip"
    },
    {
        name : "Hotel Detail",
        path : "/hotel/:id",
        element : <HotelDetail />,
        status : "skip"
    }
]

export const USER_LIST: IMenu[] = [
    {
        name: "Profile",
        path: "/profile/:id",
        element: <ProfilePage />,
        status: "skip"
    },
    {
        name: "User Order",
        path: "/order/:id",
        element: <UserTransaction />,
        status: "skip"
    },
    {
        name: "User History",
        path: "/history/:id",
        element: <UserHistoryTransaction />,
        status: "skip"
    },
    {
        name : "Credit Card",
        path : "/credit-card/:id",
        element : <CreditCard />,
        status : "skip"
    },
    {
        name : "Flight Cart",
        path : "/cart/:id",
        element : <UserCartTransaction />,
        status : "skip"
    },
    {
        name : "Game",
        path : "../game",
        element : <Game />,
        icon: <FaGamepad />,
        status : "skip"
    },
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
        name: "Manage Hotel",
        path: "/manage-hotel",
        element: <ManageHotel />,
        icon: <FaHotel />
    },
    {
        name: "Manage Promo",
        path: "/manage-promo",
        element: <ManagePromo />,
        icon: <RiCoupon2Fill />
    },
    {
        name: "Profile",
        path: "/profile/:id",
        element: <ProfilePage />,
        status: "skip"
    }
]