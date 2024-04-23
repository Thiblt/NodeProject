const {addBeerToOrder, deleteBeerFromOrder} = require("../controllers/beer_order.controller")
const {validateIdParamOrder} = require ("../middlewares/order.middleware")
const {validateId_biereParam}= require ("../middlewares/beer_order.middleware")
const  validate =require ("../middlewares/validate.middleware")
const express = require("express")
const router = express.Router()

// Delete /beer_order/:id_commande/biere/:id_biere => Supprimer une biere à une commande
router.delete("/:id_commande/biere/:id_biere",validateIdParamOrder,validateId_biereParam,validate,  deleteBeerFromOrder)

//   POST /beer_order/:id_commande/biere/:id_biere => Ajouter une biere à une commande
router.post("/:id_commande/biere/:id_biere",validateIdParamOrder,validateId_biereParam, validate, addBeerToOrder)



module.exports = router