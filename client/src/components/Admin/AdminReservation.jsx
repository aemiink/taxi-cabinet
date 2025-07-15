import React, { useEffect, useState } from "react";
import classes from "./AdminReservations.module.css";

function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const API_BASE = import.meta.env.VITE_API_URL ;

    useEffect(() => {
        fetch(`${API_BASE}/reservations/`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setReservations(data))
            .catch(err => console.error("❌ Rezervasyonları çekerken hata:", err));
    }, []);

    const deleteReservation = (id) => {
        fetch(`${API_BASE}/reservations/${id}`, {
            method: "DELETE",
            credentials: "include"
        })
            .then(() => {
                alert("✅ Rezervasyon silindi!");
                setReservations(reservations.filter(res => res._id !== id));
            })
            .catch(err => console.error("❌ Silme hatası:", err));
    };

    return (
        <div className={classes.container}>
            <h2>📋 Rezervasyon Yönetimi</h2>
            <table>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Telefon</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Nereden</th>
                        <th>Nereye</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(res => (
                        <tr key={res._id}>
                            <td>{res.name}</td>
                            <td>{res.surname}</td>
                            <td>{res.phone}</td>
                            <td>{res.date}</td>
                            <td>{res.time}</td>
                            <td>{res.from}</td>
                            <td>{res.to}</td>
                            <td><button onClick={() => deleteReservation(res._id)}>🗑 Sil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminReservations;
