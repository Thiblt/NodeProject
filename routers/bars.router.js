const { Router } = require("express");
const BarsController = require("../controllers/bars.controller");

// Variables
const router = Router();

// Global Route
router.route("/").get(BarsController.all).post(BarsController.create);
router
  .route("/:id_bar")
  .get(BarsController.one)
  .put(BarsController.update)
  .delete(BarsController.delete);

module.exports = router;
