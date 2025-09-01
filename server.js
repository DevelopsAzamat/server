import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // ⚠️ В реальном проекте нужна база данных
const SECRET = "supersecret"; // поменяй на свой ключ

// === Регистрация ===
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: "Пользователь уже существует" });
  }
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: "Регистрация успешна" });
});

// === Логин ===
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Нет такого пользователя" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Неверный пароль" });

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ message: "Успешный вход", token });
});

// === Пример защищённого маршрута ===
app.get("/profile", (req, res) => {
  const auth = req.headers["authorization"];
  if (!auth) return res.status(401).json({ error: "Нет токена" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: "Привет, " + decoded.username });
  } catch {
    res.status(401).json({ error: "Неверный токен" });
  }
});

app.listen(3000, () => console.log("API запущен на 3000"));
