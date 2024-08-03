const { check } = require('express-validator');
const config = require('../config');

module.exports = {
  create: [
    check('firstName')
      .exists()
      .withMessage('Nombre es requerido')
      .isLength({ min: 3 })
      .withMessage('Nombre debe tener al menos 3 caracteres'),
    check('lastName')
      .exists()
      .withMessage('Apellido es requerido')
      .isLength({ min: 3 })
      .withMessage('Apellido debe tener al menos 3 caracteres'),
    check('email')
      .exists()
      .withMessage('Email es requerido')
      .isEmail()
      .withMessage('Email debe ser válido'),
    check('password')
      .exists()
      .withMessage('Contraseña es requerida')
      .isLength({ min: 6 })
      .withMessage('Contraseña debe tener al menos 6 caracteres'),
    check('provider')
      .exists()
      .withMessage('Proveedor es requerido')
      .isIn(config.global.providers)
      .isString()
      .withMessage('Proveedor debe ser una cadena de texto'),
  ],
};
