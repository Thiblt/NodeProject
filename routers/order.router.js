const {deleteOrderById,
    addOrder,
    getAllOrderByBar,
    getOrderById,
    putOrder,} = require("../controllers/order.controller")
const { validateIdParamOrder, validateId_barParam, validateBodyOrder, validateBodyPutOrder }  =require ("../middlewares/order.middleware")
const  validate =require ("../middlewares/validate.middleware")
const express = require("express")
const router = express.Router()

// POST /bars/:id_bar/commandes => Ajouter une commande à un bars
router.post("/bars/:id_bar",validateId_barParam, validateBodyOrder,validate,  addOrder)

//   GET /bars/:id_bar/commandes => Liste des commandes d'un bars
router.get("/bars/:id_bar",validateId_barParam, validate, getAllOrderByBar)

//   GET /commandes/:id => Détail d'une commande d'un bars
router.get("/:id_commande",validateIdParamOrder, validate, getOrderById)

//   PUT /commandes/:id_commande => Modifier une commande d'un bars
router.put("/:id_commande", validateIdParamOrder,validateBodyPutOrder, validate, putOrder )

// DELETE /commandes/:id_commande => Supprimer une commande d'un bars
router.delete("/:id_commande",validateIdParamOrder, validate, deleteOrderById)


module.exports = router