require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/photos", express.static(path.join(__dirname, "private", "photos")));

app.post("/login", (req, res) => {
  const { password } = req.body;

  const KEY_CODE = process.env.KEY_CODE;

  if (password === KEY_CODE) {
    res.status(200).json({ status: "success" });
  } else {
    res.status(401).json({ status: "fail" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
