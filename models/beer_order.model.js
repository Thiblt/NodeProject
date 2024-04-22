const sequelize = require("sequelize");
const db = require("../config/sequelize.config");

const Beer_order = db.define("beer_order", {
  id_beer: { type: sequelize.INTEGER, allowNull: false },
 id_order: { type: sequelize.INTEGER, allowNull: false },
});

module.exports = Beer_order;