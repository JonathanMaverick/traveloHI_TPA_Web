import { Link } from "react-router-dom";
import { MENU_LIST } from "../settings/menu-settings";
import styles from "../styles/components/navbar.module.scss"
import useUser from "../contexts/user-context";

export default function Navbar() {

    const { logout } = useUser()

    return (
        <div className={styles['nav-bar']}>
            {MENU_LIST.map((menu) => <Link key={menu.path} to={menu.path}>{menu.name}</Link>)}
            <Link to="/login" onClick={logout}>Logout</Link>
        </div>
    )
}