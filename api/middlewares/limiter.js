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
          msg: 'Muchas peticiones consecutivas por favor espere 15 minutos para volver a intentarlo',
          statusCode: 429,
        }),
      );
    },
    message:
      'Muchas peticiones consecutivas por favor espere 15 minutos para volver a intentarlo',
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
          msg: 'Muchas peticiones consecutivas por favor espere 10 minutos para volver a intentarlo',
          statusCode: 429,
        }),
      );
    },
    keyGenerator: (req) =>
      req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    message:
      'Muchas peticiones consecutivas por favor espere 10 minutos para volver a intentarlo',
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
          msg: 'Muchas peticiones consecutivas por favor espere 10 minutos para volver a intentarlo',
          statusCode: 429,
        }),
      );
    },
    keyGenerator: (req) =>
      req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    message:
      'Muchas peticiones consecutivas por favor espere 5 minutos para volver a intentarlo',
    standardHeaders: true,
    legacyHeaders: false,
  }),
};
