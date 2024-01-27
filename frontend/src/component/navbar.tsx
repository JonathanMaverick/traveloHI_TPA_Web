import "../styles/components/navbar.scss"
import useUser from "../contexts/user-context";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCartPlus, FaFire, FaRegCreditCard, FaSearch, FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from 'react';
import '../styles/components/sidebar.scss';
import { ADMIN_LIST, MENU_LIST, USER_LIST } from "../settings/menu-settings";
import useCurrency from "../contexts/currency-context";
import { ISearch } from "../interfaces/search/search-interface";
import add_search from "../api/search/add_search";
import get_search_history from "../api/search/get_search_history";
import { MdHistory } from "react-icons/md";
import get_top_5_search from "../api/search/get_top_5_search";

export default function Navbar() {

    useEffect(() => {
        fetchSearchHistory();
        fetchTopSearch();
    }, []); 

    const INITIAL_SEARCH: ISearch = {
        search: " ",
        userID : 0,
    };

    const fetchSearchHistory = async () => {
        if(!user){
            return;
        }
        else{
            const response = await get_search_history(user?.userID || 0);
            if (response == -1) {
                return;
            }else{
                // console.log(response.data)
                setSearchHistory(response.data);
            }
        }
    };

    const fetchTopSearch = async () => {
        if(!user){
            return;
        }
        else{
            const response = await get_top_5_search();
            if (response == -1) {
                return;
            }else{
                setTopSearch(response.data);
            }
        }
    };

    const { logout, user } = useUser();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const {currency, setCurrency} = useCurrency();
    const [searchData, setSearchData] = useState<ISearch>(INITIAL_SEARCH);
    const [searchHistory, setSearchHistory] = useState<ISearch[]>([]);
    const [topSearch, setTopSearch] = useState<ISearch[]>([]);
    const [showSearchOptions, setShowSearchOptions] = useState(false);

    const logoutClick = () => {
        logout();
    }

    const registerClick = () => {
        navigate('/register');
    }

    const sidebarMenuClick = (path: string) => {
        navigate(path);
    }

    const handleClick = () => {
        if (currency === 'IDR') {
            setCurrency('USD');
        } else {
            setCurrency('IDR');
        }
    };

    const redirectProfilePage = () => {
        navigate(`../user/profile/${user?.userID}`);
    };

    const handleSearch = async () => {
        if(!user){
            searchData.userID = 0;
        }
        else{
            searchData.userID = user.userID || 0;
        }
        await add_search(searchData);
        navigate(`/search/${searchData.search}`);
        setSearchData(INITIAL_SEARCH);
    };

    let topIndexCounter = 0;

    const handleOptionClick = (value:any) => {
        console.log(value);
        setSearchData({ ...searchData, search: value });
        setShowSearchOptions(false);
    };

    return (
        <div className="nav-bar">
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                {isSidebarOpen && (
                    <>
                    {user && (
                        <div className="sidebar-profile">
                            <img src={user?.profilePicture} alt="" />
                            <div className="user-profile">
                                <p>Hello! {user?.firstName}</p>
                            </div>
                        </div>
                    )}
                    {MENU_LIST.map(({ path, icon, name, status }: any) => (
                        status !== "skip" && (
                            <div onClick={() => sidebarMenuClick(path)} key={path} className="sidebar-menu">
                                {icon}{name}
                            </div>
                        )
                    ))}
                    {user && (
                        USER_LIST.map(({ path, icon, name, status }: any) => (
                            status !== "skip" && (
                                <div key={path} onClick={() => sidebarMenuClick(path.startsWith('/user') ? path : `/user${path}`)} className="sidebar-menu">
                                    {icon}{name}
                                </div>
                            )
                        ))
                    )}
                    {user?.role === 'admin' && (
                        ADMIN_LIST.map(({ path, icon, name, status }: any) => (
                            status !== "skip" && (
                                <div key={path} onClick={() => sidebarMenuClick(path.startsWith('/admin') ? path : `/admin${path}`)} className="sidebar-menu">
                                    {icon}{name}
                                </div>
                            )
                        ))
                    )}
                    </>
                )}
            </div>
            <div onClick={() => setSidebarOpen(false)} className={`overlay ${isSidebarOpen ? 'open' : ''}`}></div>
            <RxHamburgerMenu className="logo-icon" size={25} onClick={() => setSidebarOpen(true)}/>
            <Link to="/"><p style={{fontWeight: "bolder", fontSize: "1.2rem"}}>TraveLoHI</p></Link>
            <div className="search-bar">
                <FaSearch className="search-icon logo-icon" size={20}/>
                <input type="text"
                    value={searchData!.search}
                    onChange={(e) => {
                        setSearchData({ ...searchData, search: e.target.value });
                        setShowSearchOptions(false);
                    }}
                    onFocus={() => setShowSearchOptions(true)} 
                    onBlur={() => setShowSearchOptions(false)} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                />
                {showSearchOptions && (
                    <div className="search-option">
                    {topSearch.map((item) => (
                        <div className="search-item" key={topIndexCounter++} onClick={() => {
                            handleOptionClick(item.search);
                        }}>
                            <FaFire color="#FF6921" /> {item.search}
                        </div>
                    ))}
                    {searchHistory.map((item) => (
                        <div className="search-item" key={item.id} onClick={() => handleOptionClick(item.search)}>
                            <MdHistory /> {item.search}
                        </div>
                    ))}
                    </div>
                )}
            </div>
            <div className="cart hover">
                <FaCartPlus className="logo-icon" size={25}/>
                <p>Pesanan Saya</p>
            </div>
            <div className="flag-container hover">
                <img className="flag" src={currency === 'IDR' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/250px-Flag_of_Indonesia.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1200px-Flag_of_the_United_States_%28Pantone%29.svg.png'} alt="" />
                {currency}
                <RiArrowDropDownLine size={25} />
                <div className="hover-content" onClick={handleClick}>
                    <div className="flag-container hover">
                        <img className="flag" src={currency !== 'IDR' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/250px-Flag_of_Indonesia.svg.png' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Flag_of_the_United_States_%28Pantone%29.svg/1200px-Flag_of_the_United_States_%28Pantone%29.svg.png'} alt="" />
                        {currency === 'IDR' ? 'USD' : 'IDR'}
                    </div>
                </div>
            </div>
            <div className="pay hover">
                Pay
                <RiArrowDropDownLine size={25} />
                <div className="pay-content">
                    <h3>Payment</h3>
                    <p>From TraveloHI</p>
                    <div className="payment-from-travelohi">
                        <div className="travelohi-payment hi-wallet">
                            <FaWallet className="logo-icon" size={25} />
                            <p>HI Wallet</p>
                            <div className="hi-wallet-balance">
                                <p>Balance</p>
                                {currency == 'IDR' ? (
                                    <p>Rp. {user?.wallet}</p>
                                ) : (
                                    <p>$ {user?.wallet ? (user.wallet / 14000).toFixed(4) : '0'}</p>
                                )}
                            </div>
                        </div>
                        <div className="travelohi-payment ">
                            <FaRegCreditCard className="logo-icon" size={25} />
                            <p>Credit Card</p>
                        </div>
                    </div>
                    <p>Another Method</p>
                    <div className="travelohi-payment">
                        <FaWallet className="logo-icon" size={25} />
                        <p>HI Debt</p>
                    </div>
                </div>
            </div>
            {user == null ? (
            <>
                <div className="login hover">
                    <CgProfile className="logo-icon" size={25} />
                    <Link to="/login"><p>Log In</p></Link>
                </div>
                <button onClick={registerClick} className="register">Register</button>
            </>
            ) : (
                <>
                    <img onClick={redirectProfilePage} src={user.profilePicture} id="profile-picture" alt="" />
                    <button onClick={logoutClick} className="logout">Logout</button>
                </>
            )}
        </div>
    )
}