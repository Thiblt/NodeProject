const {deleteOrderById,
    addOrder,
    getAllOrderByBar,
    getOrderById,
    putOrder, 
    getPdfById} = require("../controllers/order.controller")
const { validateIdParamOrder, validateId_barParam, validateBodyOrder, validateBodyPutOrder }  =require ("../middlewares/order.middleware")
const  validate =require ("../middlewares/validate.middleware")
const express = require("express")
const router = express.Router()

// POST /orders/bars/:id_bar => Ajouter une commande à un bars
router.post("/bars/:id_bar",validateId_barParam, validateBodyOrder,validate,  addOrder)

//   GET /orders/bars/:id_bar => Liste des commandes d'un bars
router.get("/bars/:id_bar",validateId_barParam, validate, getAllOrderByBar)

//   GET /orders/:id_commande => Détail d'une commande d'un bars
router.get("/:id_commande",validateIdParamOrder, validate, getOrderById)

//   PUT //orders/:id_commande => Modifier une commande d'un bars
router.put("/:id_commande", validateIdParamOrder,validateBodyPutOrder, validate, putOrder )

// DELETE /orders/:id_commande => Supprimer une commande d'un bars
router.delete("/:id_commande",validateIdParamOrder, validate, deleteOrderById)

// GET /orders/details/:id_commande => Afficher un pdf de la commande
router.get("/details/:id_commande",validateIdParamOrder, validate, getPdfById)


module.exports = router