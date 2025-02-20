import React, { useEffect } from "react";
import tr from "../assets/tr.svg";
import en from "../assets/en.svg";
import classes from "./LanguageSelector.module.css";

const LanguageSelector = ({ selectedLang, setSelectedLang }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectLanguage = (lang) => {
        console.log("Selected Language:", lang); // Seçilen dili ekrana yazdıralım
        setSelectedLang(lang);
        localStorage.setItem("selectedLang", lang); // Kullanıcı seçimini kaydet
        setIsOpen(false);
    };

    return (
        <div className={classes.languageSelector}>
            <button className={classes.selectedLang} onClick={toggleDropdown}>
                <img src={selectedLang === "TR" ? tr : en} alt="flag" className={classes.flagIcon} />
                {selectedLang} <span className={classes.arrow}>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className={classes.dropdown}>
                    <button onClick={() => selectLanguage("TR")} className={classes.dropdownItem}>
                        <img src={tr} alt="TR" className={classes.flagIcon} /> TR
                    </button>
                    <button onClick={() => selectLanguage("EN")} className={classes.dropdownItem}>
                        <img src={en} alt="EN" className={classes.flagIcon} /> EN
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
