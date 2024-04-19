const sequelize = require("sequelize");
const db = require("../config/sequelize.config");

const Order = db.define("order", {
  id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: sequelize.STRING, allowNull: false },
  price: { type: sequelize.FLOAT, allowNull: false },
  id_bar: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  date: { type: sequelize.DATE, defaultValue: sequelize.NOW },
  status: { type: sequelize.STRING, allowNull: false },
});

module.exports = Order;

// A ajouter plus tard
// references: {
//     // This is a reference to another model
//     model: Bar,
//     // This is the column name of the referenced model
//     key: "id",
//   },