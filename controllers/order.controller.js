const Order = require("../models/order.js");

const getOrderById = (req, res) => {
  Order.findByPk(req.params.id).then((order) => res.json(order));
};

const getAllOrderByBar = (req, res) => {
  Order.findAll({ where: { id_bar: req.params.id_bar } }).then((orders) =>
    res.json(orders)
  );
};

const addOrder = (req, res) => {
  const order = {
    name: req.body.name,
    price: req.body.price,
    id_bar: req.params.id_bar,
    status: req.body.status,
  };

  if (req.body.date) {
    order.date = req.body.date;
  }

  Order.create(order)
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      res.send(err);
    });
};

const putOrder = (req, res) => {
  const order = {};
  if (req.body.name) {
    order.name = req.body.name;
  }
  if (req.body.price) {
    order.price = req.body.price;
  }

  if (req.body.status) {
    order.status = req.body.status;
  }

  if (req.body.date) {
    order.date = req.body.date;
  }

  Order.update(order, { where: { id: req.params.id_commande } })
    .then((order) => res.json(order))
    .catch((err) => {
      res.send(err);
    });
};

const deleteOrderById = (req, res) => {
  Order.destroy({ where: { id: req.params.id_commande } }).then(() =>
    res.send("Order deleted")
  );
};

module.exports = {
  deleteOrderById,
  addOrder,
  getAllOrderByBar,
  getOrderById,
  putOrder,
};
