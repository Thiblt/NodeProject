// ------ Dependences ------
const express = require("express");
const sequelize = require("./config/sequelize.config");

const app = express();
const port = 3001;

// ------ Middlewares ------

app.use(express.json());

// ------ Routes ------

app.get("/", (req, res) => {
  res.send("Hello from server !");
});

// ------ Listen ------

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw error;
  }
});
