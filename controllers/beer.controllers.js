const Beer = require("../models/beer.models");

//List of all beers from a bar
const getAll = (req, res) => {
  Beer.findAll().then((beer) => res.json(beer));
};
// Create a beer
const beer_new = (req, res) => {
  const bar = {
    id: req.params.id,
  };

  const beer = {};
  if (req.body.name !== undefined) beer.name = req.body.name;
  if (req.body.description !== undefined)
    beer.description = req.body.description;
  if (req.body.degree !== undefined) beer.degree = req.body.degree;
  if (req.body.bars_id !== undefined) beer.bars_id = req.body.beers_id;

  Beer.create(beer)
    .then((queryResult) => {
      res.send(queryResult);
    })
    .catch((err) => {
      res.send(err);
    });
};

//modify a beer
const update = (req, res) => {
  const beer = {};
  if (req.body.name !== undefined) beer.name = req.body.name;
  if (req.body.description !== undefined)
    beer.description = req.body.description;
  if (req.body.degree !== undefined) beer.degree = req.body.degree;
  if (req.body.bars_id !== undefined) beer.bars_id = req.body.beers_id;

  Beer.update(beer, { where: { id: req.params.id } })
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
const getById = (req, res) => {
  Beer.findByPk(req.params.id).then((task) => {
    res.json(task);
  });
};

module.exports = { destroy, getAll, update, getById, beer_new };
