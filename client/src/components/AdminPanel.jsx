import React from "react";
import { Outlet } from "react-router-dom"; // 📌 React Router'ın Outlet'ini ekledik
import classes from "./AdminPanel.module.css";

function AdminPanel() {
    return (
        <div className={classes.adminContainer}>
            <h2>🔧 Admin Paneli</h2>
            <div className={classes.divider}></div>
            <Outlet /> 
        </div>
    );
}

export default AdminPanel;
