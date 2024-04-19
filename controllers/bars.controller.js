const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

const Bars = require("../models/bars.model");

const Commands = [
  {
    id: 1,
    date: "2021-01-01",
    price: 10,
    quantity: 1,
    status: "en cours",
    id_bar: 1,
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
      if (!bar_list) {
        return res.status(404).json({
          message: "Error: Bars not found",
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
