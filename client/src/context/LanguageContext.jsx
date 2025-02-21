import { createContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("tr");

  useEffect(() => {
    fetch("http://localhost:5000/language")
      .then((res) => res.json())
      .then((data) => setLanguage(data.language))
      .catch((err) => console.error("Dil yükleme hatası:", err));
  }, []);

  const changeLanguage = (lang) => {
    fetch("http://localhost:5000/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang }),
    })
      .then(() => setLanguage(lang))
      .catch((err) => console.error("Dil değiştirme hatası:", err));
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
