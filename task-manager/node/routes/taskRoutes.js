const express = require("express");
const router = express.Router();
const Task = require("../models/Tasks");

router.post("/", async (req, res) => {

  try {
    const task = new Task({
      title: req.body.title,
      priority: req.body.priority
    })

    const savedTask = await task.save();

    res.json(savedTask);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

})

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        priority: req.body.priority,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;