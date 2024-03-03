const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("./src/middlewares/rateLimit.js");
const errorHandlerMiddleware = require("./src/middlewares/errorhandler.js");
const router = require("./src/routers/index.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json({ limit: "40mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname));
app.use(cors()); // CORS ayarları için sadece cors() fonksiyonunu kullanmak yeterli

// API limiter middleware
app.use("/api", rateLimit);

// Ana sayfa rotası
app.get("/", (req, res) => {
    res.json({ message: "Hoşgeldiniz" });
});
// Hata işleyici middleware
app.use(errorHandlerMiddleware);
// API rotası
app.use("/api", router);

// Server dinleme
app.listen(port, () => {
    console.log(`Server ${port} portunda çalışıyor`);
});
