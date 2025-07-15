import React, { useEffect, useState } from "react";
import classes from "./AdminDrivers.module.css";

function AdminDrivers() {
    const [drivers, setDrivers] = useState([]);
    const [newDriver, setNewDriver] = useState({
        image: "",
        name: "",
        experience: "",
        years: ""
    });
    const API_BASE = import.meta.env.VITE_API_URL ;

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = () => {
        fetch(`${API_BASE}/drivers`)
            .then(res => res.json())
            .then(data => setDrivers(data))
            .catch(err => console.error("❌ Sürücüleri çekerken hata:", err));
    };

    const deleteDriver = (id) => {
        fetch(`${API_BASE}/drivers/delete/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("✅ Sürücü silindi!");
                setDrivers(drivers.filter(driver => driver._id !== id));
            })
            .catch(err => console.error("❌ Silme hatası:", err));
    };

    const handleInputChange = (e) => {
        setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
    };

    const addDriver = (e) => {
        e.preventDefault();
        fetch(`${API_BASE}/drivers/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDriver)
        })
            .then(res => res.json())
            .then(data => {
                alert("✅ Yeni şoför eklendi!");
                setDrivers([...drivers, data]); 
                setNewDriver({ image: "", name: "", experience: "", years: "" });
            })
            .catch(err => console.error("❌ Şoför ekleme hatası:", err));
    };

    return (
        <div className={classes.container}>
            <h2>🚖 Şoför Yönetimi</h2>


            <form onSubmit={addDriver} className={classes.addDriverForm}>
                <input
                    type="text"
                    name="image"
                    placeholder="Resim URL'si"
                    value={newDriver.image}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Adı"
                    value={newDriver.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="experience"
                    placeholder="Deneyim (yıl)"
                    value={newDriver.experience}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="years"
                    placeholder="Çalışma Süresi (yıl)"
                    value={newDriver.years}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">➕ Şoför Ekle</button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>Resim</th>
                        <th>Ad</th>
                        <th>Deneyim</th>
                        <th>Çalışma Süresi</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => (
                        <tr key={driver._id}>
                            <td><img src={driver.image} alt={driver.name} width="50" /></td>
                            <td>{driver.name}</td>
                            <td>{driver.experience} yıl</td>
                            <td>{driver.years} yıl</td>
                            <td><button onClick={() => deleteDriver(driver._id)}>🗑 Sil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDrivers;
