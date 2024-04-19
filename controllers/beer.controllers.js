const Beer = require("../models/beer.models");
const bars = [
  {
    id: 1,
    name: "test",
  },
];
//List of all beers from a bar
const getAll = (req, res) => {
  console.log(req.params.id_bar);
  Beer.findAll({ where: { id_bar: req.params.id_bar } }).then((beer) =>
    res.json(beer)
  );
};
// Create a beer
const beer_new = (req, res) => {
  const testBar = bars.filter((bar) => bar.id == req.params.id_bar && bar)[0];

  if (testBar == undefined) return res.send("Le bar n'existe pas");

  const beer = {};
  if (req.body.name !== undefined) beer.name = req.body.name;
  if (req.body.description !== undefined)
    beer.description = req.body.description;
  if (req.body.degree !== undefined) beer.degree = req.body.degree;
  if (req.body.price !== undefined) beer.price = req.body.price;
  beer.id_bar = testBar.id;

  Beer.create(beer)
    .then((queryResult) => {
      res.send(queryResult);
    })
    .catch((err) => {
      res.send(err);
    });
};

//modify a beer
const update = async (req, res) => {
  const beer = {};
  if (req.body.name !== undefined) beer.name = req.body.name;
  if (req.body.description !== undefined)
    beer.description = req.body.description;
  if (req.body.degree !== undefined) beer.degree = req.body.degree;
  if (req.body.price !== undefined) beer.price = req.body.price;

  await Beer.update(beer, { where: { id: req.params.id } })
    .then((queryResult) => res.send(queryResult))
    .catch((err) => {
      res.send(err);
    });
};

// Delete a beer
const destroy = (req, res) => {
  Beer.destroy({ where: { id: req.params.id } }).then(() =>
    res.send("Beer deleted")
  );
};

// Watch beer info
const getById = async (req, res) => {
  await Beer.findByPk(req.params.id).then((queryResult) => {
    res.json(queryResult);
  });
};

module.exports = { destroy, getAll, update, getById, beer_new };
