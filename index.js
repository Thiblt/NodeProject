// ------ Dependences ------

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// ------ Middlewares ------

app.use(cors());
app.use(express.json());

// ------ Routes ------

app.get("/", (req, res) => {
  res.send("Hello from server !");
});

// ------ Listen ------

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
