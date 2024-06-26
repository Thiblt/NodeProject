const Order = require("../models/order.model.js");
const Bars = require("../models/bars.model.js");
const Beer_order= require("../models/beer_order.model.js");
const puppeteer = require('puppeteer');


const getOrderById = (req, res) => {
  Order.findByPk(req.params.id_commande).then((order) => res.json(order));
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
    id_bar: parseInt(req.params.id_bar),
    status: req.body.status,
    date: req.body.date || new Date().toLocaleString(),
  };

  Order.create(order)
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      res.send(err);
    });
};

const putOrder = async (req, res) => {
  //check si le statut est "terminée"
  const order = await Order.findByPk(req.params.id_commande);
  if (!order) {
    return res.status(404).json({
      message: "Error: Order not found",
    });
  }

  if (order.status === "terminée") {
    res.json("Cette commande ne peut pas être modifiée");
  } else {
    if (req.body.name) {
      order.name = req.body.name;
      console.log(order.name);
      console.log(req.body.name + " body");
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

    order
      .save()
      .then((order) => res.json(order))
      .catch((err) => {
        res.send(err);
      });
  }
};

const deleteOrderById = (req, res) => {
  Order.destroy({ where: { id: req.params.id_commande } })
    .then(() =>
      Beer_order.destroy({
        where: {
          id_order: req.params.id_commande,
        },
      })
    )
    .then(() => res.send("Order deleted"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting order");
    });
};

const getPdfById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id_commande);
    const bar = await Bars.findByPk(order.id_bar);

    const htmlContent = `
      <html>
        <body>
          <h1>Commande numéro ${order.id}</h1>
          <table>
            <tr>
              <td>Nom de la commande</td>
              <td>${order.name}</td>
            </tr>
            <tr>
              <td>Prix</td>
              <td>${order.price} euros</td>
            </tr>
            <tr>
              <td>Nom du bar</td>
              <td>${bar.name}</td>
            </tr>
            <tr>
              <td>Date de la commande</td>
              <td>${order.date}</td>
            </tr>
            <tr>
              <td>Statut de la commande</td>
              <td>${order.status}</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf();
    await browser.close();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Order-${order.id}.pdf"`,
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
};

module.exports = {
  deleteOrderById,
  addOrder,
  getAllOrderByBar,
  getOrderById,
  putOrder,
  getPdfById,
};
