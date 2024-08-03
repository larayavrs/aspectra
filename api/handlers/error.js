const GeneralError = require('../helpers/errors');
const sequelize = require('sequelize');
const config = require('../config');

/**
 * @description Error handler
 * @param {Object} err - Error object
 * @param {Object} res - Response object
 * @throws {GeneralError} - Throws a GeneralError
 */
module.exports = (err, _, res, __) => {
  const dev = config.global.env === 'development';
  if (dev) console.error(err);
  if (err instanceof GeneralError) {
    return res.status(err.statusCode).json({
      type: err.type,
      message: err.message,
      statusCode: err.statusCode,
      status: 'Error',
      errors: dev ? err.errors : 'Ningun contenido para visualizar',
    });
  }
  if (err instanceof sequelize.ValidationError) {
    let message;
    const dev_mode = config.global.env === 'development';
    if (err.errors.length > 1) message = err.errors.map((e) => e.message);
    else message = err.errors[0].message;
    return res.status(400).json({
      status: 'Error interno de validación',
      statusCode: 500,
      message: dev_mode ? message : 'Ningun contenido para visualizar',
    });
  }
  return res.status(500).json({
    status: 'Error',
    statusCode: 500,
    message: err.message,
  });
};
