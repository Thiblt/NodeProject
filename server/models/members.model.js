// Dependences

const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ms = require("ms");

const sequelize = require("../config/sequelize.config");

const Members = sequelize.define("members", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
});

// Model
Members.hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
Members.verifyPassword = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
Members.refreshToken = async (member) => {
  const key = process.env.JWT_REFRESH_KEY;
  const body = {
    id: member.id,
    role: member.role,
  };

  const token = jwt.sign(body, key, {
    expiresIn: ms("1h"),
  });

  console.log(token);

  return token;
};
Members.accessToken = async (member) => {
  const key = process.env.JWT_ACCESS_KEY;
  const body = {
    id: member.id,
    role: member.role,
  };

  const token = jwt.sign(body, key, {
    expiresIn: ms("5m"),
  });

  return token;
};

module.exports = Members;
