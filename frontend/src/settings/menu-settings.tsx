import HomePage from "../pages/home/home-page";

export interface IMenu {
    name : string;
    path: string;
    element: JSX.Element;
}

export const MENU_LIST: IMenu[] = [  
    {
        name: "Home",
        path: "/",
        element: <HomePage />
    },
]