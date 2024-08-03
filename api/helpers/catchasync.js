/**
 * @description Catch async
 * @param {Function} handler - Handler function
 * @returns {Function} Handler function
 */
module.exports = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);
