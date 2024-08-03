/**
 * @class GeneralError
 * @extends Error
 * @param {String} type - Error type
 * @param {String} msg - Error message
 * @param {Number} statusCode - Error status code
 * @param {Object} errors - Error errors
 * @returns {Object} Error object
 */
module.exports = class GeneralError extends Error {
  constructor({ type, msg, statusCode, errors }) {
    super();
    this.type = type;
    this.message = msg;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
};
