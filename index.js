const express = require("express");
const initServer = require("./db");
const signup = require("./process");
const bodyParser = require("body-parser");

initServer();
var app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/user", signup);

app.listen(5252, (req, res) => {
  console.log("server is runnning!!!");
});
