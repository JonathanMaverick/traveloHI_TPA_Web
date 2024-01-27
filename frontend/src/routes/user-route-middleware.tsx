import { Route, Routes, useNavigate } from "react-router-dom";
import { IMenu, USER_LIST } from "../settings/menu-settings";
import MainLayout from "../layout/main-layout";
import useUser from "../contexts/user-context";
import { useEffect } from "react";

export default function UserRouteMiddleware() {

    const {user} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (user == null){
            navigate('/')
        }
    },[user])

    return (
        <MainLayout>
            <Routes>
                {USER_LIST.map(({path, element}: IMenu) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </MainLayout>
    )
}