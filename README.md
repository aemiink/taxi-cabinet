
<div align="center">
  <h1>🚖 Taxi Cabinet Web Site</h1>
  <img src="https://i.ibb.co/C3hCxZMY/bg.png">
</div>

<p align="center"><b><i>MERN Full-Stack Project</i></b></p>

This project is a **MERN Stack (MongoDB, Express.js, React.js, Node.js)** based full-featured system that allows managing taxi reservations for both city and intercity travels. It helps businesses quickly manage customer requests and **automatically sends reservation details to drivers via WhatsApp API integration**.

---

## 📌 Features

✅ **Admin Panel**: Manage drivers, vehicles, and reservations.\
✅ **Reservation Module**: Users can book instant or future reservations.\
✅ **WhatsApp API Integration**: Automatically sends reservation details to drivers.\
✅ **Multi-Language Support**: Available in **English and Turkish**.\
✅ **Authentication & Security**: JWT-based user and admin authentication.\
✅ **Mobile-Friendly (Responsive) Design**: Works on both mobile and desktop.\
✅ **Vehicle Management**: Admin can manage and modify vehicle listings.

---

## 🚀 Technologies Used

### **Frontend**

- React.js (React Router, Context API)
- CSS (Responsive Design)

### **Backend**

- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- WhatsApp Business API Integration

### **Deployment**

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
  git clone https://github.com/username/royal-taxi-reservation.git
  cd royal-taxi-reservation
```

### **2️⃣ Backend Setup**

```bash
  cd server
  npm install
  npm start
```

### **3️⃣ Frontend Setup**

```bash
  cd client
  npm install
  npm start
```

---

## 🌍 Environment Variables

Create a **.env** file in the root directory and add the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
WHATSAPP_API_URL=https://graph.facebook.com/v18.0/
PHONE_NUMBER_ID=your_whatsapp_phone_number_id
ACCESS_TOKEN=your_whatsapp_access_token
```

---

## 📩 WhatsApp Message Format

When a reservation is successfully created, a message is sent to the driver in the following format:

```
📅 New Taxi Reservation!
🕒 Date: [Date]
📍 Location: [Current City] ➝ [Destination City]
👤 Customer: [Full Name]
📞 Phone: [Phone Number]
```

---

## 🎯 API Endpoints

| Endpoint                        | Method | Description                 |
| ------------------------------- | ------ | --------------------------- |
| /auth/login                     | POST   | Admin login                 |
| /auth/logout                    | POST   | Admin logout                |
| /reservations                   | GET    | Fetch all reservations      |
| /reservations                   | POST   | Create a new reservation    |
| /drivers                        | GET    | Fetch all drivers           |
| /drivers                        | POST   | Add a new driver            |
| /cars                           | GET    | List all cars               |
| /cars                           | POST   | Add a new car               |
| /whatsapp/send-whatsapp-message | POST   | Send a message via WhatsApp |

---

## 📢 Contributing

If you’d like to contribute, feel free to **submit a pull request (PR)** or open an **issue**!

---

## ✨ Screenshots

# 📌 Homepage
<div align=""center>
  <img src="https://i.ibb.co/Jj958mfc/Screenshot-2025-03-01-003300.png" width="500px">
  <img src="https://i.ibb.co/sJsKm9XC/Screenshot-2025-03-01-003308.png" width="500px">
  <img src="https://i.ibb.co/gbCFFRLQ/Screenshot-2025-03-01-003317.png" width="500px">
  <img src="https://i.ibb.co/mrgZ88Dg/Screenshot-2025-03-01-003325.png" width="500px">
  <img src="https://i.ibb.co/99ZST75H/Screenshot-2025-03-01-003330.png" width="500px">
  <img src="https://i.ibb.co/nM3zqbjH/Screenshot-2025-03-01-003335.png" width="500px">
</div>

# 📌 Reservation Form
<div align=""center>
  <img src="https://i.ibb.co/XkvRYwPF/Screenshot-2025-03-01-003407.png" width="500px">
  <img src="https://i.ibb.co/YFS3c0q8/Screenshot-2025-03-01-003401.png" width="500px">
</div>

# 📌 Admin Panel
<div align=""center>
  <img src="https://i.ibb.co/R4Nq4jd8/Screenshot-2025-03-01-003424.png" width="500px">
  <img src="https://i.ibb.co/Q7ckJnDp/Screenshot-2025-03-01-003430.png" width="500px">
  <img src="https://i.ibb.co/fVvQMMfn/Screenshot-2025-03-01-003438.png" width="500px">
  <img src="https://i.ibb.co/DDd84nk4/Screenshot-2025-03-01-003444.png" width="500px">
</div>

---

## 📞 Contact

📧 **Email:** [aekkaya@outlook.com.tr](mailto\:aekkaya@outlook.com.tr)\
🔗 **LinkedIn:** [Ahmet Emin Kaya](https://www.linkedin.com/in/ahmet-emin-kaya-5b0765236/)\
🖥 **GitHub:** [aemiink](https://github.com/aemiink)

---

**🔹 If you liked this project, don't forget to ⭐ star it on GitHub!** 🚀

