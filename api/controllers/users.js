const GeneralError = require('../helpers/errors');
const catchasync = require('../helpers/catchasync');
const success_response = require('../helpers/success');

const users_service = require('../services/users');
const email_service = require('../services/email');

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
      email_service.send({
        to: user.email,
        template_name: 'email-verification.ejs',
        context: {
          link: `http://localhost:3000/api/v1/users/verify/${user.verification_token}`,
        },
      });
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

  /**
   * @description Login user
   * @returns {Promise<Object>}
   * @throws {GeneralError}
   */
  login: catchasync(async (req, res, next) => {
    try {
      const user = await users_service.find_by({ email: req.body.email });
      if (!user)
        throw new GeneralError({
          type: 'not_found',
          statusCode: 404,
          msg: 'Usuario no encontrado',
        });
      if (!user.is_verified) {
        await email_service.send({
          to: user.email,
          subject: 'Por favor verifica tu cuenta',
          template_name: 'email-verification.ejs',
          context: {
            link: `http://localhost:3000/api/v1/users/verify/${user.verification_token}`,
          },
        });
        throw new GeneralError({
          type: 'unauthorized',
          statusCode: 401,
          msg: 'Por favor verifica tu cuenta',
        });
      }
      success_response({
        res,
        message: 'Has iniciado sesión exitosamente',
        body: user,
      });
    } catch (error) {
      next(error);
    }
  }),
};
