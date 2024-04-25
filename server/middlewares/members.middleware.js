const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

const MemberMiddleware = {
  signup: [
    body("email", "email must be added to body").notEmpty().isEmail(),
    body("pwd", "password must be added to body").notEmpty().isStrongPassword({
      minLength: 6,
    }),
    body("role", "role must be bewteen user and admin")
      .optional()
      .isIn(["user", "admin"]),
  ],
};

const verifyRefresh = (req, res, next) => {
  const token =
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    null;
  if (!token)
    return res.status(401).json({ message: "Error: member is not connected" });

  jwt.verify(token, process.env.JWT_REFRESH_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Error: member is not connected" });
    }
    req.member = decoded;
    next();
  });
};
const verifyAccess = (req, res, next) => {
  const token =
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    null;
  if (!token)
    return res.status(401).json({ message: "Error: member is not connected" });

  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Error: member is not connected" });
    }
    req.member = decoded;
    next();
  });
};
const verifyAdmin = (req, res, next) => {
  const token =
    (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
    null;
  if (!token)
    return res.status(401).json({ message: "Error: member is not connected" });

  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err || decoded.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Error: member is not connected" });
    }

    req.member = decoded;
    next();
  });
};

module.exports = { MemberMiddleware, verifyRefresh, verifyAccess, verifyAdmin };
