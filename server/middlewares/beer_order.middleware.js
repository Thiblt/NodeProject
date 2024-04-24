const { body, param } = require('express-validator');

const validateId_biereParam = [
    param('id_biere')
      .notEmpty()
      .isNumeric()
  ];

  module.exports = { validateId_biereParam };