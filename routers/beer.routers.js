const {
  destroy,
  getAll,
  update,
  beer_new,
  getById,
} = require("../controllers/beer.controllers.js");
/* const {
  validateIdParam,
  validateBodyParam,
} = require("../validator/taskValidator.js");
const validate = require("../validator/validate.js"); */

const express = require("express");
const router = express.Router();

//add a beer in a bar
router.post("/bars/:id_bar/biere", beer_new);
//Edit a beer
router.put("/beer/:id", update);
//delete a beer
router.delete("/beer/:id", destroy);
//list of all beers of a bar
router.get("bars/:id_bar/beer", getAll);
//details of a beer
router.get("beer/:id", getById);

module.exports = router;
