const { body, param, query } = require("express-validator");

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
};

module.exports = BarsMiddleware;
