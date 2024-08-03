const catchasync = require('../helpers/catchasync');
const GeneralError = require('../helpers/errors');
const { validationResult } = require('express-validator');

/**
 * @description Validator middleware
 * @param {Array} checks - Array of checks
 * @returns {Function}
 */
module.exports = (checks) => {
  return catchasync(async (req, _, next) => {
    const results = checks.map((check) => check.run(req));
    await Promise.all(results);
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    next(new GeneralError({ msg: errors.array()[0].msg, statusCode: 400 }));
  });
};
