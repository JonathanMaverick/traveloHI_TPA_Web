import { Route, Routes } from "react-router-dom";
import { MENU_LIST, IMenu } from "../settings/menu-settings";
import MainLayout from "../layout/main-layout";
import useUser from "../contexts/user-context";
import { useEffect } from "react";

export default function GuestRouteMiddleware() {
    const {user} = useUser()

    useEffect(() => {
        console.log("guest")
    },[user])

    return (
        <MainLayout>
            <Routes>
                {MENU_LIST.map(({path, element}: IMenu) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </MainLayout>
    )
}