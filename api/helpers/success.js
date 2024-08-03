/**
 * @description Success response helper
 * @param {Object} res - Response object
 * @param {Number} code - Response code (default: 200)
 * @param {String} message - Response message (default: 'Success')
 * @param {Object} body - Response body
 * @param {Object} options - Response options
 * @returns {Object} Response object
 */
module.exports = ({ res, code = 200, message = 'Success', body, options }) => {
  res.status(code).json({
    code,
    message,
    body,
    options,
  });
};
