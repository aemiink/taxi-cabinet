import React, { useState, useEffect, useContext } from "react";
import tr from "../assets/tr.svg";
import en from "../assets/en.svg";
import classes from "./LanguageSelector.module.css";
import LanguageContext from "../context/LanguageContext";

const LanguageSelector = () => {
    const { language, changeLanguage } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (lang) => {
        console.log("Seçilen Dil:", lang); // Konsola yazdır
        changeLanguage(lang); // Backend'e isteği gönder
        setIsOpen(false);
    };

    return (
        <div className={classes.languageSelector}>
            <button className={classes.selectedLang} onClick={toggleDropdown}>
                <img src={language === "tr" ? tr : en} alt="flag" className={classes.flagIcon} />
                {language.toUpperCase()} <span className={classes.arrow}>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className={classes.dropdown}>
                    <button onClick={() => selectLanguage("tr")} className={classes.dropdownItem}>
                        <img src={tr} alt="TR" className={classes.flagIcon} /> TR
                    </button>
                    <button onClick={() => selectLanguage("en")} className={classes.dropdownItem}>
                        <img src={en} alt="EN" className={classes.flagIcon} /> EN
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
