const mongoose = require("mongoose");

const initServer = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/mydb", {
      useNewUrlParser: true,
    });
    console.log("database connected successfully!!!");
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

module.exports = initServer;
