import { Route, Routes, useNavigate } from "react-router-dom";
import { IMenu, ADMIN_LIST } from "../settings/menu-settings";
import MainLayout from "../layout/main-layout";
import { useEffect } from "react";
import useUser from "../contexts/user-context";

export default function AdminRouteMiddleware() {
    const {user} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("admin")
        console.log(user)
        if (user == null){
            navigate('/')
        }
        else if(user.role !== 'admin'){
            navigate('/')
        }
    },[user])

    return (
        <MainLayout>
            <Routes>
                {ADMIN_LIST.map(({path, element}: IMenu) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </MainLayout>
    )
}