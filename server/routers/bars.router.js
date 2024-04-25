const { Router } = require("express");
const BarsController = require("../controllers/bars.controller");
const BarsMiddleware = require("../middlewares/bars.middleware");
const validate = require("../middlewares/validate.middleware");
const { verifyAccess } = require("../middlewares/members.middleware");

// Variables
const router = Router();

// Global Route
router
  .route("/")
  .get(BarsController.all)
  .post(verifyAccess, BarsMiddleware.create, validate, BarsController.create);
router
  .route("/:id_bar")
  .get(BarsMiddleware.one, validate, BarsController.one)
  .put(verifyAccess, BarsMiddleware.update, validate, BarsController.update)
  .delete(verifyAccess, BarsMiddleware.delete, validate, BarsController.delete);

// Specific Routes
router.get(
  "/:id_bar/orders",
  BarsMiddleware.command_by_date,
  validate,
  BarsController.orders_by_date
);

router.get(
  "/:id_bar/degree",
  BarsMiddleware.degree,
  validate,
  BarsController.getDegree
);
router.get(
  "/:id_bar/beer",
  BarsMiddleware.beer,
  validate,
  BarsController.getListOfBeer
);

module.exports = router;
