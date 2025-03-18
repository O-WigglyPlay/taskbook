const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// 할 일 추가
router.post("/", async (req, res) => {
  const { userId, task } = req.body;
  try {
    const newTodo = new Todo({ userId, task });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

// 할 일 조회
router.get("/:userId", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
