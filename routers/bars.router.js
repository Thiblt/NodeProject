const { Router } = require("express");
const BarsController = require("../controllers/bars.controller");
const BarsMiddleware = require("../middlewares/bars.middleware");
const validate = require("../middlewares/validate.middleware");

// Variables
const router = Router();

// Global Route
router
  .route("/")
  .get(BarsController.all)
  .post(BarsMiddleware.create, validate, BarsController.create);
router
  .route("/:id_bar")
  .get(BarsMiddleware.one, validate, BarsController.one)
  .put(BarsMiddleware.update, validate, BarsController.update)
  .delete(BarsMiddleware.delete, validate, BarsController.delete);

// Specific Routes
// router.get(
//   "/:id_bar/commandes",
//   BarsMiddleware.command_by_date,
//   BarsController.command_by_date
// );

module.exports = router;
