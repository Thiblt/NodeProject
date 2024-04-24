const { Op } = require("sequelize");

const Bars = require("../models/bars.model");
const Beer = require("../models/beer.model");
const OrderBeer = require("../models/beer_order.model");
const Order = require("../models/order.model");

const BarsController = {
  /**
   * Recupère la liste des bars
   * @returns
   * - message: string
   * - data?: array | object
   */
  all: async (req, res) => {
    try {
      const { city, name } = req.query;

      const bar_list_where = () => {
        let where = {};
        if (city) {
          where.adresse = { [Op.like]: `%${city.toLowerCase()}%` };
        }
        if (name) {
          where.name = { [Op.like]: `%${name.toLowerCase()}%` };
        }
        return where;
      };

      // fetch all bars
      const bar_list = await Bars.findAll({
        where: bar_list_where(),
      });
      if (!bar_list.length) {
        return res.status(404).json({
          message: "Error: Bars was not found",
        });
      }

      return res.status(200).json({
        message: "Request successfully completed",
        data: bar_list,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}}`,
      });
    }
  },
  /**
   * Recupère un bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  one: async (req, res) => {
    try {
      const { id_bar } = req.params;
      const bar = await Bars.findByPk(id_bar);
      if (!bar) {
        return res.status(404).json({
          message: "Error: Bar not found",
        });
      }

      return res.status(200).json({
        message: "Request successfully completed",
        data: bar,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}}`,
      });
    }
  },
  /**
   * Recupère la liste des commandes d'un bar, à une date donnée
   */
  orders_by_date: async (req, res) => {
    try {
      const { id_bar } = req.params;
      const { date, price_min, price_max, status, name } = req.query;
      if (!date && !price_min && !price_max && !status && !name) {
        return res.status(404).json({
          message: "Error: Date / Price not found",
        });
      }

      const bar = await Bars.findByPk(id_bar);
      if (!bar) {
        return res.status(404).json({
          message: "Error: Bar not found",
        });
      }

      const orders_where = () => {
        let where = {
          id_bar: id_bar,
        };
        if (date) {
          const new_date = new Date(date).toLocaleString().split(" ")[0];
          const day = new_date.split("/")[0];
          const month = new_date.split("/")[1];
          const year = new_date.split("/")[2];
          const formatted_date = `${day}/${month}/${year}`;

          where.date = {
            [Op.like]: `%${formatted_date}%`,
          };
        }
        if (price_min) {
          where.price = {
            ...where.price,
            [Op.gte]: price_min,
          };
        }
        if (price_max) {
          where.price = {
            ...where.price,
            [Op.lte]: price_max,
          };
        }
        if (status) {
          where.status = { [Op.like]: `%${status}%` };
        }
        if (name) {
          where.name = { [Op.like]: `%${name}%` };
        }
        return where;
      };

      const orders = await Orders.findAll({
        where: orders_where(),
      });
      if (!orders.length) {
        return res.status(404).json({
          message: "Error: Orders not found",
        });
      }

      return res.status(200).json({
        message: "Request successfully completed",
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}}`,
      });
    }
  },
  /**
   * Créer un nouveau bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  create: async (req, res) => {
    try {
      const { name, adresse, tel, email, description } = req.body;
      // Verify the existence of the bar
      const bar_occ = await Bars.findOne({
        where: {
          name: name,
          adresse: adresse,
          tel: tel,
          email: email,
        },
      });
      if (bar_occ) {
        return res.status(409).json({
          message: "Error: Bar already exists",
        });
      }

      // Create the bar
      await Bars.create({
        name: name,
        adresse: adresse,
        tel: tel,
        email: email,
        description: description,
      })
        .then(async (bar) => {
          return res.status(201).json({
            message: "Success: Request successfully completed",
            data: bar,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({
            message: "Error: Bars not created",
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}}`,
      });
    }
  },
  /**
   * Mettre à jour un bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  update: async (req, res) => {
    try {
      const { id_bar } = req.params;
      const { name, adresse, tel, email, description } = req.body;

      // Verify the existence of the bar
      const bar_occ = await Bars.findByPk(id_bar);
      if (!bar_occ) {
        return res.status(404).json({
          message: "Error: Bar not found",
        });
      }

      // Update the bar
      await Bars.update(
        {
          name: name,
          adresse: adresse,
          tel: tel,
          email: email,
          description: description,
        },
        { where: { id: id_bar } }
      )
        .then(() => {
          return res.status(200).json({
            message: "Success: Request successfully completed",
          });
        })
        .catch(() => {
          return res.status(400).json({
            message: "Error: Bars not updated",
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}}`,
      });
    }
  },
  /**
   * Supprimer un bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  delete: async (req, res) => {
    try {
      const { id_bar } = req.params;

      // Verify the existence of the bar
      const bar_occ = await Bars.findByPk(id_bar);
      if (!bar_occ) {
        return res.status(404).json({
          message: "Error: Bar not found",
        });
      }
      await Bars.destroy({ where: { id: id_bar } })
        .then(() => {
          return res.status(200).json({
            message: "Success: Request successfully completed",
          });
        })
        .catch(() => {
          return res.status(400).json({
            message: "Error: Bars not deleted",
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: `Error: ${error}}`,
      });
    }
  },
  getDegree: async (req, res) => {
    const { id_bar } = req.params;
    const { price_min, price_max, date } = req.query;
    const beerList = [];

    const bar = await Bars.findByPk(id_bar).then((data) => {
      return data;
    });

    if (!bar) {
      return res.status(400).json({
        message: "Error: bar not found",
      });
    }
    //récupère une liste des commandes
    const orders = await Order.findAll({
      where: {
        id_bar: id_bar,
        date: {
          [Op.like]: `%${date.split("-")[2]}/${date.split("-")[1]}/${
            date.split("-")[0]
          }%`,
        },
      },
    });

    //console.log(orders);
    if (orders.length) {
      orders.forEach(async (order) => {
        const ordersBeers = await OrderBeer.findAll({
          where: { id_order: order.id },
        });
        if (ordersBeers.length) {
          //on se trouve dans la table de jointure et on a plusieurs éléments de cette table
          //ordersBeers.forEach(async (orderBeer) => {
          for (let orderBeer of ordersBeers) {
            const beer = await Beer.findByPk(orderBeer.id_beer);
            if (!beerList.filter((_beer) => _beer.id == beer.id).length) {
              beerList.push(beer);
            }
          }

          let totDegree = 0;
          // boucle et incrémente toutes les bières filtrées
          beerList.forEach((beer) => {
            totDegree += beer.degree;
          });
          // On récupérè le total de dégré et on le divise par le nombre de bière trouvé
          const averageDegree = Math.round(totDegree / beerList.length);
          return res.json({ averageDegree });
        }
        console.log("🚀 ~ //ordersBeers.forEach ~ beerlist:", beerlist);
      });
    } else {
      const beer_where = () => {
        let result = { id_bar: bar.id };
        if (price_min) {
          result.price = { ...result.price, [Op.gte]: price_min };
        }
        if (price_max) {
          result.price = { ...result.price, [Op.lte]: price_max };
        }
        return result;
      };

      const beers = await Beer.findAll({ where: beer_where() }).then((data) => {
        return data;
      });

      if (!beers.length) {
        return res.status(400).json({
          message: "Error: beer not found",
        });
      }

      let totDegree = 0;
      // boucle et incrémente toutes les bières filtrées
      beers.forEach((beer) => {
        totDegree += beer.degree;
      });
      // On récupérè le total de dégré et on le divise par le nombre de bière trouvé
      const averageDegree = Math.round(totDegree / beers.length);
      return res.json({ averageDegree });
    }
  },
  getListOfBeer: async (req, res) => {
    const { id_bar } = req.params;
    const {
      sort,
      limit,
      offset,
      degree_min,
      degree_max,
      price_min,
      price_max,
    } = req.query;

    const bar = await Bars.findByPk(id_bar).then((data) => {
      return data;
    });

    if (!bar) {
      return res.status(400).json({
        message: "Error: bar not found",
      });
    }

    const objTri = { where: { id_bar: id_bar } };
    if (sort) {
      objTri.order = [["name", sort]];
    }
    if (limit) {
      objTri.limit = limit;
    }
    if (offset) {
      objTri.offset = offset;
    }
    if ((degree_min, degree_max)) {
      objTri.where.degree = {
        [Op.between]: [degree_min, degree_max],
      };
    }
    if ((price_min, price_max)) {
      objTri.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    //récupère une liste des bieres du bar choisis
    const beer = await Beer.findAll(objTri);

    if (beer.length == 0) {
      return res.status(400).json({
        message: "Error: No beers founded",
      });
    }
    res.status(200).json(beer);
    //console.log(beer);
  },
};

module.exports = BarsController;
