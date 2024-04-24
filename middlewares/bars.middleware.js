const { body, param, query } = require("express-validator");

const ValidateCustomTri = (value) => {
  if (value === "asc" || value === "desc") {
    return true;
  }
  return false;
};
const BarsMiddleware = {
  create: [
    body("name", "name must be added to body").notEmpty().isString(),
    body("adresse", "adresse must be added to body").notEmpty().isString(),
    body("tel", "tel must be added to body").notEmpty().isString(),
    body("email", "email must be added to body").notEmpty().isEmail(),
    body("description", "description must be added to body")
      .optional()
      .isString(),
  ],
  one: param("id_bar", "id_bars must be added to URL")
    .notEmpty()
    .isInt()
    .withMessage("id_bars must be an integer"),
  command_by_date: [
    query("date", "date must be added to query").optional().isString(),
    query("price_min", "price_min must be added to query").optional().isFloat(),
    query("price_max", "price_max must be added to query").optional().isFloat(),
    query("status", "status must be added to query").optional().isString(),
    query("name", "name must be added to query").optional().isString(),
  ],
  update: [
    param("id_bar", "id_bars must be added to URL").notEmpty().isInt(),
    body("name", "name must be added to body").optional().isString(),
    body("adresse", "adresse must be added to body").optional().isString(),
    body("tel", "tel must be added to body").optional().isString(),
    body("email", "email must be added to body").optional().isEmail(),
    body("description", "description must be added to body")
      .optional()
      .isString(),
  ],
  delete: param("id_bar", "id_bars must be added to URL").notEmpty().isInt(),
  degree: [
    query("price_min", "price_min must be added to URL")
      .optional()
      .isFloat()
      .withMessage("Price_min must be a number"),
    query("price_max", "price_max must be added to URL")
      .optional()
      .isFloat()
      .withMessage("Price_max must be a number"),
  ],
  beer: [
    query("sort", "Sort must be added 'asc' or 'desc'")
      .optional()
      .custom(ValidateCustomTri)
      .isString(),
    query("limit", "Limit must be a number").optional().isNumeric(),
    query("offset", "Offset must be a number").optional().isNumeric(),
    query("degree_min", "Degree_min must be a number").optional().isNumeric(),
    query("degree_max", "Degree_max must be a number").optional().isNumeric(),
    query("price_min", "Price_min must be a number").optional().isNumeric(),
    query("price_max", "Price_max must be a number").optional().isNumeric(),
  ],
};

module.exports = BarsMiddleware;
