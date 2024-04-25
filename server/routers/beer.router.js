const {
  destroy,
  getAll,
  update,
  beer_new,
  getById,
} = require("../controllers/beer.controller.js");

const {
  validateBeerIdParam,
  validateBeerBodyParam,
} = require("../middlewares/beer.middleware.js");
const { verifyAdmin } = require("../middlewares/members.middleware.js");
const validate = require("../middlewares/validate.middleware.js");
const express = require("express");
const router = express.Router();

//add a beer in a bar
router.post(
  "/bars/:id_bar",
  verifyAdmin,
  validateBeerBodyParam,
  validate,
  beer_new
);
//Edit a beer
router.put("/:id", verifyAdmin, validateBeerBodyParam, validate, update);
//delete a beer
router.delete("/:id", verifyAdmin, destroy);
//list of all beers of a bar
router.get("/bars/:id_bar", getAll);
//details of a beer
router.get("/:id", getById);

module.exports = router;
