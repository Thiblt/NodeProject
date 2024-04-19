const { body, param } = require("express-validator");
//const beer = require("../repository/productRepository");

const validateBeerIdParam = [param("id").notEmpty().isNumeric()];

const validateBeerBodyParam = [
  body("name").isString().notEmpty(),
  body("description").isString().notEmpty(),
  body("degree").notEmpty(),
  body("price").notEmpty().isFloat({ min: 0 }),
];

module.exports = { validateBeerIdParam, validateBeerBodyParam };
