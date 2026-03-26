const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb+srv://yy2419524_db_user:Saniya_143@cluster0.bxo7v4p.mongodb.net/portfolioDB?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// 📦 Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String
});

// 📁 Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

// ✅ Root route (for testing)
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ Feedback API route
app.post("/feedback", async (req, res) => {
  console.log("🔥 API HIT");
  console.log("📩 Received:", req.body);

  try {
    const { name, email, feedback } = req.body;

    // Validation
    if (!name || !email || !feedback) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Save to MongoDB
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();

    console.log("✅ Saved to MongoDB");

    res.json({
      success: true,
      message: "Feedback saved successfully!"
    });

  } catch (err) {
    console.log("❌ Server Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
