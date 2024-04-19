// ------ Dependences ------
const express = require("express");
const sequelize = require("./config/sequelize.config");
const orderRouter = require("./routers/order.router.js")

const app = express();
const port = 3001;

// ------ Middlewares ------

app.use(express.json());

// ------ Routes ------

app.get("/", (req, res) => {
  res.send("Hello from server !");
});
app.use("/orders",orderRouter)

// ------ Listen ------

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV === "production") {
      await sequelize.sync({ force: true, logging: false });
      console.log("Drop and re-sync db");
    }
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw error;
  }
});
