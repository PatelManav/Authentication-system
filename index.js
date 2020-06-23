const express = require("express");
const initServer = require("./db");
var app = express();
initServer();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.listen(5252, (req, res) => {
  console.log("server is runnning!!!");
});
