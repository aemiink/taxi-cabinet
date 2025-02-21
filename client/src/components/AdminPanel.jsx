import React, { useEffect, useState } from "react";
import classes from "./AdminPanel.module.css";

function AdminPanel() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = () => {
    fetch("http://localhost:5000/reservations")
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error("❌ Rezervasyonları çekerken hata:", err));
  };

  const deleteReservation = (id) => {
    fetch(`http://localhost:5000/reservations/${id}`, { method: "DELETE" })
      .then(() => {
        alert("✅ Rezervasyon silindi!");
        fetchReservations(); // Listeyi yenile
      })
      .catch(err => console.error("❌ Silme hatası:", err));
  };

  return (
    <div className={classes.adminContainer}>
      <h2>📋 Rezervasyonlar</h2>
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
            <th>Notlar</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.name}</td>
              <td>{res.surname}</td>
              <td>{res.phone}</td>
              <td>{res.date}</td>
              <td>{res.time}</td>
              <td>{res.from}</td>
              <td>{res.to}</td>
              <td>{res.notes || "-"}</td>
              <td>
                <button onClick={() => deleteReservation(res._id)}>🗑 Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
