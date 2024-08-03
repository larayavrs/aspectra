const GeneralError = require('../helpers/errors');
const catchasync = require('../helpers/catchasync');
const success_response = require('../helpers/success');

const users_service = require('../services/users');

/**
 * @description Users controller
 */
module.exports = {
  /**
   * @description Get all users
   * @returns {Promise<Array>}
   * @throws {GeneralError}
   */
  get: catchasync(async (_, res, next) => {
    try {
      const users = await users_service.get();
      if (!users || users.length === 0)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Usuarios no encontrados',
        });
      success_response({
        res,
        message: 'Usuarios encontrados exitosamente',
        body: users,
      });
    } catch (error) {
      next(error);
    }
  }),

  /**
   * @description Create user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  create: catchasync(async (req, res, next) => {
    try {
      const user = await users_service.create(req.body);
      user.password = undefined;
      success_response({
        res,
        message:
          'Te has registrado exitosamente en nuestra plataforma. Por favor inicia sesión',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),
};
