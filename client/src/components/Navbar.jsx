import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 📌 useLocation eklendi
import classes from "./Navbar.module.css";
import logo from "../assets/taksilogo.svg";
import LanguageSelector from "./LanguageSelector";
import CallIcon from "@mui/icons-material/Call";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import CloseIcon from "@mui/icons-material/Close";
import LanguageContext from "../context/LanguageContext";

function Navbar() {
    const { language } = useContext(LanguageContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 
    const API_BASE = import.meta.env.VITE_API_URL ;

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${API_BASE}/auth/admin`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("❌ Auth kontrol hatası:", error);
            setIsAuthenticated(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${API_BASE}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            setIsAuthenticated(false);
            navigate("/"); 
        } catch (error) {
            console.error("Çıkış hatası:", error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const translations = {
        tr: { 
            home: "Anasayfa", 
            taxis: "Taksilerimiz", 
            services: "Hizmetlerimiz", 
            more: "Rezervasyon", 
            callTaxi: "Taksi Çağır", 
            logout: "Çıkış Yap",
            adminReservations: "Rezervasyon Yönetimi",
            adminDrivers: "Şoför Yönetimi",
            adminCars: "Araç Yönetimi",
            adminSettings: "Ayarlar"
        },
        en: { 
            home: "Home", 
            taxis: "Our Taxis", 
            services: "Our Services", 
            more: "Reservation", 
            callTaxi: "Call Taxi", 
            logout: "Logout",
            adminReservations: "Reservation Management",
            adminDrivers: "Driver Management",
            adminCars: "Cars Management",
            adminSettings: "Settings"
        }
    };

    const t = translations[language] || translations["tr"];


    const isAdminPage = location.pathname.startsWith("/admin/dashboard");

    return (
        <nav className={classes.Navbara}>
            <div className={classes.navLeft}>
                <img src={logo} alt="Sivas Taxi" width="250px" />
            </div>

            <div className={classes.navCenter}>
                <ul>
                    {isAdminPage ? (
                        <>
                            <li><a onClick={() => navigate("/admin/dashboard/reservations")}>{t.adminReservations}</a></li>
                            <li><a onClick={() => navigate("/admin/dashboard/drivers")}>{t.adminDrivers}</a></li>
                            <li><a onClick={() => navigate("/admin/dashboard/cars")}>{t.adminCars}</a></li>
                            <li><a onClick={() => navigate("/admin/dashboard/settings")}>{t.adminSettings}</a></li>
                        </>
                    ) : (
                        <>
                            <li><a onClick={() => navigate("/")}>{t.home}</a></li>
                            <li><a onClick={() => navigate("/taxis")}>{t.taxis}</a></li>
                            <li><a onClick={() => navigate("/#services")}>{t.services}</a></li>
                            <li><a onClick={() => navigate("/reservation")}>{t.more} ▼</a></li>
                        </>
                    )}
                </ul>
            </div>

            <div className={classes.navRight}>
                <LanguageSelector />


                {isAdminPage && isAuthenticated ? (
                    <button onClick={handleLogout} className={classes.logoutButton}>
                        <ExitToAppIcon /> {t.logout}
                    </button>
                ) : (
                    <a href="tel:+905551112233" className={classes.callButton}>
                        <CallIcon />
                        {t.callTaxi}
                    </a>
                )}
            </div>

            <button className={classes.hamburger} onClick={toggleMenu}>
                <MenuIcon />
            </button>


            <div className={`${classes.sidebar} ${menuOpen ? classes.open : ""}`}>
                <button className={classes.closeButton} onClick={toggleMenu}>
                    <CloseIcon />
                </button>
                <ul className={classes.mobileMenu}>
                    {isAdminPage ? (
                        <>
                            <li><a onClick={() => navigate("/admin/dashboard/reservations")}>{t.adminReservations}</a></li>
                            <li><a onClick={() => navigate("/admin/dashboard/drivers")}>{t.adminDrivers}</a></li>
                            <li><a onClick={() => navigate("/admin/dashboard/settings")}>{t.adminSettings}</a></li>
                        </>
                    ) : (
                        <>
                            <li><a onClick={() => navigate("/")}>{t.home}</a></li>
                            <li><a onClick={() => navigate("/taxis")}>{t.taxis}</a></li>
                            <li><a onClick={() => navigate("#services")}>{t.services}</a></li>
                            <li><a onClick={() => navigate("/reservation")}>{t.more} ▼</a></li>
                        </>
                    )}
                    <li className={classes.mobileLang}>
                        <LanguageSelector />
                    </li>
                    <li className={classes.mobileButton}>
                        {isAdminPage && isAuthenticated ? (
                            <button onClick={handleLogout} className={classes.logoutButton}>
                                <ExitToAppIcon /> {t.logout}
                            </button>
                        ) : (
                            <a href="tel:+905551112233" className={classes.callButton}>
                                <CallIcon /> {t.callTaxi}
                            </a>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
