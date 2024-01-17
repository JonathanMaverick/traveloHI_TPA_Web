import { Route, Routes } from "react-router-dom";
import { MENU_LIST, IMenu } from "../settings/menu-settings";
import MainLayout from "../layout/main-layout";

export default function GuestRouteMiddleware() {

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