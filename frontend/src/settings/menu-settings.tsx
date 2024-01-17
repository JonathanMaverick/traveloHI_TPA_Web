import AddFlight from "../pages/flight/addFlight";
import HomePage from "../pages/home/home-page";
import { FaPlaneDeparture } from "react-icons/fa";

export interface IMenu {
    name : string;
    path: string;
    element: JSX.Element;
    icon?: JSX.Element;
}

export const MENU_LIST: IMenu[] = [  
    {
        name: "Home",
        path: "/",
        element: <HomePage />
    },
]

export const ADMIN_LIST: IMenu[] = [
    {
        name: "Home",
        path: "/",
        element: <HomePage />
    },
    {
        name: "Add Flight",
        path: "/add-flight",
        element: <AddFlight />,
        icon: <FaPlaneDeparture />
    }
]