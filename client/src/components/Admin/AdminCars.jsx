import React, { useEffect, useState, useContext } from "react";
import classes from "./AdminCars.module.css";
import LanguageContext from "../../context/LanguageContext";

function AdminCars() {
    const { language } = useContext(LanguageContext);
    const [cars, setCars] = useState([]);
    const [newCar, setNewCar] = useState({ image: "", name: "", description: "" });
    const API_BASE = import.meta.env.VITE_API_URL ;

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch(`${API_BASE}/cars`)
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.error("❌ Arabaları çekerken hata:", err));
    };

    const deleteCar = (id) => {
        fetch(`${API_BASE}/cars/delete/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("✅ Araç silindi!");
                setCars(cars.filter(car => car._id !== id));
            })
            .catch(err => console.error("❌ Silme hatası:", err));
    };

    const handleInputChange = (e) => {
        setNewCar({ ...newCar, [e.target.name]: e.target.value });
    };

    const addCar = (e) => {
        e.preventDefault();
        fetch(`${API_BASE}/cars/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar)
        })
            .then(res => res.json())
            .then(data => {
                alert("✅ Yeni araç eklendi!");
                setCars([...cars, data]);
                setNewCar({ image: "", name: "", description: "" });
            })
            .catch(err => console.error("❌ Araç ekleme hatası:", err));
    };

    const translations = {
        tr: {
            title: "🚗 Araç Yönetimi",
            addCar: "➕ Araç Ekle",
            image: "Resim URL",
            name: "Araç Adı",
            description: "Açıklama",
            delete: "🗑 Sil"
        },
        en: {
            title: "🚗 Car Management",
            addCar: "➕ Add Car",
            image: "Image URL",
            name: "Car Name",
            description: "Description",
            delete: "🗑 Delete"
        }
    };

    const t = translations[language] || translations.tr;

    return (
        <div className={classes.container}>
            <h2>{t.title}</h2>


            <form onSubmit={addCar} className={classes.addCarForm}>
                <input type="text" name="image" placeholder={t.image} value={newCar.image} onChange={handleInputChange} required />
                <input type="text" name="name" placeholder={t.name} value={newCar.name} onChange={handleInputChange} required />
                <input type="text" name="description" placeholder={t.description} value={newCar.description} onChange={handleInputChange} required />
                <button type="submit">{t.addCar}</button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>{t.image}</th>
                        <th>{t.name}</th>
                        <th>{t.description}</th>
                        <th>{t.delete}</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car._id}>
                            <td><img src={car.image} alt={car.name} width="50" /></td>
                            <td>{car.name}</td>
                            <td>{car.description}</td>
                            <td><button onClick={() => deleteCar(car._id)}>{t.delete}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCars;
