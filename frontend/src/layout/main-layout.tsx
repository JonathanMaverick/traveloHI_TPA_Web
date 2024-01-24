import Footer from "../component/footer"
import Navbar from "../component/navbar"
import { IChildren } from "../interfaces/children-interface"
import "../styles/layout/main-layout.scss"

export default function MainLayout({children}: IChildren) {
    
    return (
        <div className="main-layout">
            <Navbar />
            <div className="children">
               {children}
            </div>
            <Footer />
        </div>
    )
}