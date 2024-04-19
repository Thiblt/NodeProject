const sequelize = require("sequelize");
const db = require("../config/sequelize.config");

const Biere = db.define("biere", {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING },
  description: { type: sequelize.STRING, allowNull: true },
  degree: { type: sequelize.FLOAT },
  price: { type: sequelize.FLOAT },
  id_bar: { type: sequelize.NUMBER },
});

module.exports = Biere;
