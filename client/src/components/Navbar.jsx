import React, { useContext, useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../assets/taksilogo.svg";
import LanguageSelector from "./LanguageSelector";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close"; 
import MenuIcon from "@mui/icons-material/Menu"; // ☰ Hamburger ikonu
import LanguageContext from "../context/LanguageContext";

function Navbar() {
    const { language } = useContext(LanguageContext);
    const [menuOpen, setMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const translations = {
        tr: { home: "Anasayfa", taxis: "Taksilerimiz", services: "Hizmetlerimiz", more: "Daha Fazlası", callTaxi: "Taksi Çağır" },
        en: { home: "Home", taxis: "Our Taxis", services: "Our Services", more: "More", callTaxi: "Call Taxi" },
    };

    const t = translations[language] || translations["tr"];

    return (
        <nav className={classes.Navbara}>
            <div className={classes.navLeft}>
                <img src={logo} alt="Sivas Taxi" width="250px" />
            </div>

            <div className={classes.navCenter}>
                <ul>
                    <li><a href="#">{t.home}</a></li>
                    <li><a href="#">{t.taxis}</a></li>
                    <li><a href="#">{t.services}</a></li>
                    <li><a href="#">{t.more} ▼</a></li>
                </ul>
            </div>

            <div className={classes.navRight}>
                <LanguageSelector />
                <a href="tel:+905551112233" className={classes.callButton}>
                    <CallIcon />
                    {t.callTaxi}
                </a>
            </div>

            {/* 🍔 Mobilde Hamburger Menü Butonu */}
            <button className={classes.hamburger} onClick={toggleMenu}>
                <MenuIcon />
            </button>

            {/* 📱 Mobil Menü */}
            <div className={`${classes.sidebar} ${menuOpen ? classes.open : ""}`}>
                <button className={classes.closeButton} onClick={toggleMenu}>
                    <CloseIcon />
                </button>
                <ul className={classes.mobileMenu}>
                    <li><a href="#">{t.home}</a></li>
                    <li><a href="#">{t.taxis}</a></li>
                    <li><a href="#">{t.services}</a></li>
                    <li><a href="#">{t.more} ▼</a></li>
                    <li className={classes.mobileLang}>
                        <LanguageSelector />
                    </li>
                    <li className={classes.mobileButton}>
                        <a href="tel:+905551112233" className={classes.callButton}>
                            <CallIcon /> {t.callTaxi}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
