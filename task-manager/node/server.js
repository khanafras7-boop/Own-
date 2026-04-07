const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

if (!MONGO_URI) {
  console.error("Missing MONGO_URI environment variable.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API server running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
