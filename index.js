// ------ Dependences ------
const express = require("express");
const sequelize = require("./config/sequelize.config");
const beerRouter = require("./routers/beer.routers");
const app = express();
const port = 3001;

// ------ Middlewares ------

app.use(express.json());

// ------ Routes ------

app.use("/beers", beerRouter);

// ------ Listen ------

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ force: true });
    }
    console.log(process.env.NODE_ENV);
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw error;
  }
});
