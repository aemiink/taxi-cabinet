import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Taxis from "./components/Serivces";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel"; 
import AdminReservations from "./components/Admin/AdminReservation"; 
import AdminDrivers from "./components/Admin/AdminDrivers"; 
import AdminCars from "./components/Admin/AdminCars"; 

import AdminSettings from "./components/Admin/AdminSettings"; 
import Home from "./components/Home";
import Reservation from "./components/Reservation";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  return (
    <LanguageProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/admin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />

        {isAuthenticated ? (
          <Route path="/admin/dashboard/*" element={<AdminPanel />}>
            <Route index element={<AdminReservations />} />
            <Route path="reservations" element={<AdminReservations />} />
            <Route path="drivers" element={<AdminDrivers />} />
            <Route path="cars" element={<AdminCars />} />  
            <Route path="settings" element={<AdminSettings />} />
          </Route> 
        ) : (
          <Route path="/admin/dashboard/*" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        )}

        <Route path="/taxis" element={<Taxis />} />
      </Routes>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
