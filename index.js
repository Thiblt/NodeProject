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
    if (process.env.NODE_ENV !== "developpement") {
      await sequelize.sync({ force: true });
    }
    console.log(process.env.NODE_ENV);
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw error;
  }
});
