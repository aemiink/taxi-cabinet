import React, { useEffect, useState } from "react";
import classes from "./AdminSettings.module.css";

function AdminSettings() {
    const [admins, setAdmins] = useState([]);
    const [passwordData, setPasswordData] = useState({ adminId: "", oldPassword: "", newPassword: "" });
    const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = () => {
        fetch("http://localhost:5000/admin/all-admins")
            .then(res => res.json())
            .then(data => setAdmins(data))
            .catch(err => console.error("❌ Adminleri çekerken hata:", err));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/admin/change-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passwordData),
        });
        const data = await response.json();
        alert(data.success || data.error);
    };

    const handleNewAdmin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/admin/add-admin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAdmin),
        });
        const data = await response.json();
        alert(data.success || data.error);
        fetchAdmins();
    };

    const deleteAdmin = async (id) => {
        if (!window.confirm("Emin misiniz?")) return;
        await fetch(`http://localhost:5000/admin/delete-admin/${id}`, { method: "DELETE" });
        fetchAdmins();
    };

    return (
        <div className={classes.settingsContainer}>
            <h2>⚙️ Admin Ayarları</h2>


            <form onSubmit={handlePasswordChange}>
                <h3>🔑 Şifre Değiştir</h3>
                <input type="text" placeholder="Admin ID" value={passwordData.adminId} onChange={(e) => setPasswordData({ ...passwordData, adminId: e.target.value })} required />
                <input type="password" placeholder="Eski Şifre" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} required />
                <input type="password" placeholder="Yeni Şifre" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
                <button type="submit">Şifreyi Güncelle</button>
            </form>


            <form onSubmit={handleNewAdmin}>
                <h3>➕ Yeni Admin Ekle</h3>
                <input type="text" placeholder="Adı" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} required />
                <input type="password" placeholder="Şifre" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} required />
                <button type="submit">Admin Ekle</button>
            </form>


            <h3>📜 Admin Kullanıcıları</h3>
            <table>
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Email</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin._id}>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td><button onClick={() => deleteAdmin(admin._id)}>🗑 Sil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminSettings;
