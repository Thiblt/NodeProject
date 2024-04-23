// ------ Dependences ------
require("dotenv").config();
const express = require("express");
const sequelize = require("./config/sequelize.config");
const orderRouter = require("./routers/order.router.js");
const BarsRouter = require("./routers/bars.router");
const beerRouter = require("./routers/beer.router");
const beer_orderRouter = require("./routers/beer_order.router");



const app = express();
const port = 3001;



// ------ Middlewares ------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------ Routes ------

app.use("/bars", BarsRouter);
app.use("/orders", orderRouter);
app.use("/beers", beerRouter);
app.use("/beer_order", beer_orderRouter);

// ------ Listen ------

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV !== "development") {
      // await sequelize.sync({ force: true, logging: false });
      console.log("Drop and re-sync db");
    }
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw error;
  }
});


module.exports = app;
