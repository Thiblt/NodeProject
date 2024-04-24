const { Op } = require("sequelize");

const Bars = require("../models/bars.model");
const Orders = require("../models/order.model");
const Beers = require("../models/beer.model");

const Commands = [
  {
    id: 1,
    date: "2021-01-01",
    price: 10,
    quantity: 1,
    status: "en cours",
    id_bar: 1,
    name: "biere",
  },
];

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
};

module.exports = BarsController;
