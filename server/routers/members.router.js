const { Router } = require("express");
const MembersController = require("../controllers/members.controller");
const MemberMiddleware = require("../middlewares/members.middleware");
const validate = require("../middlewares/validate.middleware");

const router = Router();

router.get("/signin", MembersController.signin);
router.get(
  "/signup",
  MemberMiddleware.signup,
  validate,
  MembersController.signup
);

// Auth Routes
router.get(
  "/access",
  MemberMiddleware.verifyRefresh,
  MembersController.get_token
);
router.delete("/", MemberMiddleware.verifyRefresh, MembersController.delete);

module.exports = router;
