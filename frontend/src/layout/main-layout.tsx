import Navbar from "../component/navbar"
import { IChildren } from "../interfaces/children-interface"
import styles from "../styles/layout/main-layout.module.scss"

export default function MainLayout({children}: IChildren) {
    
    return (
        <div className={styles['main-layout']}>
            <Navbar />
            {children}
        </div>
    )
}