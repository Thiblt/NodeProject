const Beer_order = require("../models/beer_order.model.js");
const Order  = require("../models/order.model.js");

const addBeerToOrder = async (req, res) => {
    const order = await Order.findByPk(req.params.id_commande);
  if (!order) {
    return res.status(404).json({
      message: "Error: Order not found",
    });
  }

  if (order.status === "terminée") {
    res.json("Cette commande ne peut pas être modifiée");
  } else {


    const beer_order = {
        id_beer: req.params.id_biere,
        id_order: req.params.id_commande,
      };
    
    
      Beer_order.create(beer_order)
        .then((beer_order) => {
          res.send(beer_order);
        })
        .catch((err) => {
          res.send(err);
        });}
};

const deleteBeerFromOrder = async (req, res) => {
    const order = await Order.findByPk(req.params.id_commande);
  if (!order) {
    return res.status(404).json({
      message: "Error: Order not found",
    });
  }

  if (order.status === "terminée") {
    res.json("Cette commande ne peut pas être modifiée");
  } else {
    
      Beer_order.destroy({  where: {
        id_beer: req.params.id_biere,
        id_order: req.params.id_commande
      } })
      .then((beer_order) => {
        if (beer_order) {
            // If the deletion was successful
            res.status(200).send("Beer deleted from order successfully.");
        } else {
            // If the deletion did not find any matching records
            res.status(404).send("Beer order not found.");
        }
    })
    .catch((error) => {
        // If there was an error during the deletion process
        console.error("Error deleting beer order:", error);
        res.status(500).send("Internal server error.");
    });
}
};


module.exports = {addBeerToOrder, deleteBeerFromOrder
  };