const { body, param } = require('express-validator');


const ValidateCustomString = (value) => {
    if (value === 'en cours' || value === 'terminée') {
      return true;
    }
    return false;
  };

  const ValidateCustomDate = (value) => {
    const formattedDateString = value.replace(/\//g, "-")
    const date = new Date(formattedDateString);
    if ( date > Date.now()) {
      return false;
    }
    return true;
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
    body('date').optional().isDate().custom(ValidateCustomDate).withMessage('Invalid date value'),
    body('status').optional().custom(ValidateCustomString).withMessage('Invalid string value'),
  ];



module.exports = { validateIdParamOrder, validateId_barParam, validateBodyOrder, validateBodyPutOrder };