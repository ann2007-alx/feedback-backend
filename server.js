const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Supabase connection
const supabase = createClient(
  "https://lzuzuvseqonsettitnyo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dXp1dnNlcW9uc2V0dGl0bnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1NTU0MTAsImV4cCI6MjA4OTEzMTQxMH0.MRpz9Xv5vaqdEfjWqYa6rfnG0kwMX_5-1_sSB4vV1bc"
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// ✅ Contact form API
app.post("/contact", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const { error } = await supabase
      .from("feedback")
      .insert([{ name, email, feedback }]);

    if (error) {
      console.log(error);
      return res.json({ success: false, message: "Error saving data" });
    }

    res.json({ success: true, message: "Feedback saved successfully!" });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error" });
  }
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});