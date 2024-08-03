/**
 * @description Route not found handler
 * @param {Object} res - Response object
 * @returns {Object} - Response object
 */
module.exports = (_, res, __) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'Ruta no encontrada',
  });
};
