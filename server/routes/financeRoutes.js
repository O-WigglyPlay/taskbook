const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const FinanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  description: { type: String },
});

const Finance = mongoose.model("Finance", FinanceSchema);

// 가계부 항목 추가
router.post("/", async (req, res) => {
  const { userId, amount, type, description } = req.body;
  try {
    const newFinance = new Finance({ userId, amount, type, description });
    await newFinance.save();
    res.status(201).json(newFinance);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 가계부 목록 조회
router.get("/:userId", async (req, res) => {
  try {
    const finances = await Finance.find({ userId: req.params.userId });
    res.json(finances);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
