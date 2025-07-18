import { createContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("tr");
  const API_BASE = import.meta.env.VITE_API_URL ;

  useEffect(() => {
    fetch(`${API_BASE}/language`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend'den gelen dil:", data.language);
        setLanguage(data.language);
      })
      .catch((err) => console.error("Dil yükleme hatası:", err));
  }, []);

  const changeLanguage = (lang) => {
    console.log(`Dil değiştiriliyor: ${lang}`);
    fetch(`${API_BASE}/language`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setLanguage(lang);
      })
      .catch((err) => console.error("Dil değiştirme hatası:", err));
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
