const { body, param } = require('express-validator');


const ValidateCustomString = (value) => {
    if (value === 'en cours' || value === 'terminée') {
      return true;
    }
    return false;
  };

const validateIdParamOrder = [
  param('id_commande')
    .notEmpty()
    .isNumeric()
];

const validateId_barParam = [
    param('id_bar')
      .notEmpty()
      .isNumeric()
  ];

const validateBodyOrder = [ 
  body('price').not().isString().notEmpty().isFloat({min:0}), 
  body('name').notEmpty().isString(),
  body('date').optional().isDate(),
  body('status').custom(ValidateCustomString).withMessage('Invalid string value'),
];

const validateBodyPutOrder = [ 
    body('price').optional().not().isString().notEmpty().isFloat({min:0}), 
    body('name').optional().notEmpty().isString(),
    body('date').optional().isDate(),
    body('status').optional().custom(ValidateCustomString).withMessage('Invalid string value'),
  ];



module.exports = { validateIdParamOrder, validateId_barParam, validateBodyOrder, validateBodyPutOrder };