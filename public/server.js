const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.listen(process.env.PORT || 8080);
