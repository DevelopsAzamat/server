// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // Разрешаем всем доменам, можно ограничить

app.get("/data", (req, res) => {
  res.json({ message: "Привет с сервера!", time: new Date() });
});

app.listen(3000, () => console.log("API запущен на http://localhost:3000"));
