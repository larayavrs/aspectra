const config = require('../config');
const catchasync = require('../helpers/catchasync');

// require services
const jwt_service = require('../services/jwt');
const users_service = require('../services/users');

const GeneralError = require('../helpers/errors');

/**
 * @description Authentication middleware for routes
 */
module.exports = catchasync(async (req, _, next) => {
  try {
    let bearer = req.headers.authorization || req.cookies.authorization;
    if (!bearer)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'Token was not found, incorrect format',
        statusCode: 401,
      });
    bearer = bearer.split(' ')[1];
    if (!bearer)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'Token was not found, incorrect format',
        statusCode: 401,
      });
    const payload = await jwt_service.verify(
      bearer,
      config.security.tokens.access.secret,
    );
    const user = await users_service.find_by_id(payload.id);
    if (!user)
      throw new GeneralError({
        statusCode: 401,
        type: 'unauthorized',
        msg: 'User doesnt exist or was deleted',
      });
    req.user = { ...payload, new_role: user.role };
    next();
  } catch (error) {
    error.message = 'Please, login to access this resource';
    next(error);
  }
});
