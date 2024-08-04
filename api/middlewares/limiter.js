const rate_limit = require('express-rate-limit');
const GeneralError = require('../helpers/errors');
const config = require('../config');

module.exports = {
  standard: rate_limit({
    windowMs: config.security.limiter.standard.windowMs,
    max: config.security.limiter.standard.max,
    handler: (_, res, next) => {
      next(
        new GeneralError({
          type: 'too_many_requests',
          msg: 'Too many consecutive requests, please wait 15 minutes to try again',
          statusCode: 429,
        }),
      );
    },
    message:
      'Too many consecutive requests, please wait 15 minutes to try again',
    standardHeaders: true,
    legacyHeaders: false,
  }),
  super_strict: rate_limit({
    windowMs: config.security.limiter.super_strict.windowMs,
    max: config.security.limiter.super_strict.max,
    handler: (_, res, next) => {
      next(
        new GeneralError({
          type: 'too_many_requests',
          msg: 'Too many consecutive requests, please wait 10 minutes to try again',
          statusCode: 429,
        }),
      );
    },
    keyGenerator: (req) =>
      req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    message:
      'Too many consecutive requests, please wait 10 minutes to try again',
    standardHeaders: true,
    legacyHeaders: false,
  }),
  strict: rate_limit({
    windowMs: config.security.limiter.strict.windowMs,
    max: config.security.limiter.strict.max,
    handler: (_, res, next) => {
      next(
        new GeneralError({
          type: 'too_many_requests',
          msg: 'Too many consecutive requests, please wait 5 minutes to try again',
          statusCode: 429,
        }),
      );
    },
    keyGenerator: (req) =>
      req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    message:
      'Too many consecutive requests, please wait 5 minutes to try again',
    standardHeaders: true,
    legacyHeaders: false,
  }),
};
