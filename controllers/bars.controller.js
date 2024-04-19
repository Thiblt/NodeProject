const Bars = require("../models/bars.model");

const BarsController = {
  /**
   * Recupère la liste des bars
   * @returns
   * - message: string
   * - data?: array | object
   */
  all: async (req, res) => {
    try {
      console.log("bar_list");
      const bar_list = await Bars.findAll({});
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
        message: "Request failed",
        error: error.message,
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
  },
  /**
   * Créer un nouveau bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  create: async (req, res) => {
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
  },
  /**
   * Mettre à jour un bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  update: async (req, res) => {
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
  },
  /**
   * Supprimer un bar
   * @returns
   * - message: string
   * - data?: array | object
   */
  delete: async (req, res) => {
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
  },
};

module.exports = BarsController;
