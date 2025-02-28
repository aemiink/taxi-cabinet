const express = require("express");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const router = express.Router();


router.put("/change-password", async (req, res) => {
  const { adminId, oldPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ error: "Admin bulunamadı!" });

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Eski şifre hatalı!" });

    admin.password = newPassword;
    await admin.save();
    res.json({ success: "Şifre başarıyla değiştirildi!" });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


router.post("/add-admin", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ error: "Bu email zaten kayıtlı!" });

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();
    res.json({ success: "Yeni admin eklendi!" });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


router.get("/all-admins", async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // Şifreyi göstermiyoruz
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});


router.delete("/delete-admin/:id", async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: "Admin silindi!" });
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

module.exports = router;
