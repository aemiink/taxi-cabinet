const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/send-whatsapp-message", async (req, res) => {
    const { driverPhone, reservationDetails } = req.body;

    if (!driverPhone || !reservationDetails) {
        return res.status(400).json({ error: "Eksik bilgi! Telefon numarası ve rezervasyon detayları gerekli." });
    }

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: driverPhone,
                type: "template",
                template: {
                    name: "rezervasyon_onayi",  
                    language: { code: "tr" },
                    components: [
                        {
                            type: "body",
                            parameters: [
                                { type: "text", text: reservationDetails.customerName },
                                { type: "text", text: reservationDetails.date }, 
                                { type: "text", text: reservationDetails.time }, 
                                { type: "text", text: reservationDetails.from }, 
                                { type: "text", text: reservationDetails.to }, 
                                { type: "text", text: reservationDetails.customerPhone }, 
                                { type: "text", text: reservationDetails.notes || "Belirtilmemiş" } 
                            ]
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("✅ WhatsApp mesajı başarıyla gönderildi:", response.data);
        res.json({ success: "WhatsApp mesajı gönderildi!", details: response.data });

    } catch (error) {
        console.error("❌ WhatsApp mesajı gönderilemedi:", error.response?.data || error);
        res.status(500).json({ error: "WhatsApp mesajı gönderilemedi!", details: error.response?.data || error });
    }
});

module.exports = router;
