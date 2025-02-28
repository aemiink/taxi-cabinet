import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AdminLogin.module.css";

function AdminLogin({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include" 
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/admin/dashboard"); s
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("❌ Sunucu hatası, tekrar deneyin!");
    }
  };

  return (
    <div className={classes.loginContainer}>
      <h2>🔑 Admin Girişi</h2>
      {error && <p className={classes.error}>{error}</p>}
      <form className={classes.loginBox} onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Kullanıcı Adı" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Şifre" onChange={handleChange} required />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default AdminLogin;
