const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

router.use(cookieParser()); 


router.get("/login", (req, res) => {
    res.status(200).json({ message: "Bu endpoint sadece POST metoduyla kullanılabilir!" });
});


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // 📌 Token’ı HttpOnly cookie olarak sakla
        res.cookie("adminToken", token, {
            httpOnly: true, // Tarayıcıdan erişilemez
            secure: process.env.NODE_ENV === "production", // HTTPS için gerekli
            sameSite: "Strict",
            maxAge: 3600000 // 1 saat
        });

        return res.status(200).json({ message: "✅ Giriş başarılı!" });
    } else {
        return res.status(401).json({ error: "❌ Hatalı kullanıcı adı veya şifre!" });
    }
});


const verifyToken = (req, res, next) => {
    const token = req.cookies.adminToken; // Cookie’den token’ı al

    if (!token) {
        return res.status(403).json({ error: "❌ Yetkisiz erişim!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "❌ Geçersiz token!" });
        }

        req.user = decoded;
        next();
    });
};


router.get("/admin", verifyToken, (req, res) => {
    res.status(200).json({ message: "✅ Admin erişimi onaylandı!" });
});


router.post("/logout", (req, res) => {
    res.clearCookie("adminToken"); // Çerezdeki token’ı sil
    res.status(200).json({ message: "✅ Çıkış yapıldı!" });
});

module.exports = router;
