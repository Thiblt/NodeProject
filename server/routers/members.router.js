const { Router } = require("express");
const MembersController = require("../controllers/members.controller");
const {
  MemberMiddleware,
  verifyRefresh,
  verifyAdmin,
} = require("../middlewares/members.middleware");
const validate = require("../middlewares/validate.middleware");

const router = Router();

router.post("/signin", verifyAdmin, MembersController.signin);
router.post(
  "/signup",
  MemberMiddleware.signup,
  validate,
  MembersController.signup
);

// Auth Routes
router.get("/access", verifyRefresh, MembersController.access);
router.delete("/", verifyRefresh, MembersController.delete);

module.exports = router;
