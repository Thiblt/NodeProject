const { Router } = require("express");
const BarsController = require("../controllers/bars.controller");
const BarsMiddleware = require("../middlewares/bars.middleware");

// Variables
const router = Router();

// Global Route
router
  .route("/")
  .get(BarsController.all)
  .post(BarsMiddleware.create, BarsController.create);
router
  .route("/:id_bar")
  .get(BarsMiddleware.one, BarsController.one)
  .put(BarsMiddleware.update, BarsController.update)
  .delete(BarsMiddleware.delete, BarsController.delete);

module.exports = router;
