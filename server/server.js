const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middleware/authMiddleware");

dotenv.config();

// 서버 설정
const app = express();
app.use(express.json());
connectDB(); // DB 연결

// 라우팅
app.use("/api/auth", authRoutes);

// 보호된 API 예시
app.get("/api/protected", authenticate, (req, res) => {
  res.json({ message: "인증된 사용자만 접근할 수 있습니다." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
