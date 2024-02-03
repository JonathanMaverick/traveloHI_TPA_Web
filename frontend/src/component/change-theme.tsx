import { MdDarkMode, MdLightMode } from "react-icons/md";
import useTheme from "../contexts/theme-context";

export default function ChangeTheme(){
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
  
    return (
      <div className={`hover change-theme ${theme}`} onClick={toggleTheme}>
        {theme === 'dark' ? <MdLightMode size={25} className="logo-icon" /> : <MdDarkMode size={25} className="logo-icon" />}
      </div>
    );
}