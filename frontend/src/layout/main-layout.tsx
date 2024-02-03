import Footer from "../component/footer"
import Navbar from "../component/navbar"
import useTheme from "../contexts/theme-context";
import { IChildren } from "../interfaces/children-interface"
import "../styles/layout/main-layout.scss"

export default function MainLayout({children}: IChildren) {
    
    const { theme } = useTheme();

    return (
      <div className={`main-layout ${theme === 'dark' ? 'dark-mode' : ''}`}>
        <Navbar />
        <div className="children">{children}</div>
        <Footer />
      </div>
    );
}