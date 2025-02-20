import React, { useState, useEffect } from "react";
import logo from "../assets/taksilogo.svg";
import LanguageSelector from "./LanguageSelector";
import CallIcon from "@mui/icons-material/Call";
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger icon
import CloseIcon from "@mui/icons-material/Close"; // Kapatma iconu
import classes from "./Navbar.module.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(null); // Başlangıçta `null` yaparak dilin yüklenmesini bekliyoruz.

    // Sayfa açıldığında localStorage'dan dili al
    useEffect(() => {
        const storedLang = localStorage.getItem("selectedLang") || "TR"; // Eğer hiç seçilmemişse varsayılan "TR" olacak.
        console.log("Stored Language:", storedLang); // Debugging için
        setSelectedLang(storedLang);
    }, []);

    // Dil değiştiğinde localStorage'a kaydet
    useEffect(() => {
        if (selectedLang !== null) {
            console.log("Setting Language:", selectedLang); // Debugging için
            localStorage.setItem("selectedLang", selectedLang);
        }
    }, [selectedLang]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Eğer dil yüklenmeden Navbar'ı render etmeye çalışırsak, hata olabilir.
    if (selectedLang === null) {
        return null; // Sayfa yüklenirken hiçbir şey göstermeyelim.
    }

    return (
        <nav className={classes.Navbara}>
            <div className={classes.navLeft}>
                <img src={logo} alt="Sivas Taksi" width="250px" />
            </div>

            <div className={classes.navCenter}>
                <ul>
                    <li><a href="">{selectedLang === "TR" ? "Anasayfa" : "Home"}</a></li>
                    <li><a href="">{selectedLang === "TR" ? "Taksilerimiz" : "Taxis"}</a></li>
                    <li><a href="">{selectedLang === "TR" ? "Hizmetlerimiz" : "Services"}</a></li>
                    <li><a href="">{selectedLang === "TR" ? "Daha Fazlası ▼" : "More Than ▼"}</a></li>
                </ul>
            </div>

            <div className={classes.navRight}>
                <LanguageSelector selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
                <a href="" className={classes.callButton}>
                    <CallIcon />
                    {selectedLang === "TR" ? "Taksi Çağır" : "Call a Taxi"}
                </a>
            </div>

            <button className={classes.hamburger} onClick={toggleMenu}>
                <MenuIcon />
            </button>

            <div className={`${classes.sidebar} ${menuOpen ? classes.open : ""}`}>
                <button className={classes.closeButton} onClick={toggleMenu}>
                    <CloseIcon />
                </button>
                <ul className={classes.mobileMenu}>
                    <li><a href="">{selectedLang === "TR" ? "Anasayfa" : "Home"}</a></li>
                    <li><a href="">{selectedLang === "TR" ? "Taksilerimiz" : "Taxis"}</a></li>
                    <li><a href="">{selectedLang === "TR" ? "Hizmetlerimiz" : "Services"}</a></li>
                    <li><a href="">{selectedLang === "TR" ? "Daha Fazlası ▼" : "More Than ▼"}</a></li>
                    <li className={classes.mobileLang}>
                        <LanguageSelector selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
                    </li>
                    <li className={classes.mobileButton}>
                        <a href="" className={classes.callButton}>
                            <CallIcon /> {selectedLang === "TR" ? "Taksi Çağır" : "Call a Taxi"}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
