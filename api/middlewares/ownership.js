const catchasync = require('../helpers/catchasync');
const GeneralError = require('../helpers/errors');

module.exports = catchasync(async (req, _, next) => {
  try {
    const user = req.user;
    if (!user)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'Hubo un error al autenticar el usuario, por favor inicia sesión',
        statusCode: 401,
      });
    if (Number(user.id) === Number(req.params.id)) next();
    else
      throw new GeneralError({
        type: 'forbidden',
        msg: 'No tienes permisos para realizar esta acción',
        statusCode: 401,
      });
  } catch (error) {
    next(error);
  }
});
