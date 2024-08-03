const catchasync = require('../helpers/catchasync');
const GeneralError = require('../helpers/errors');

module.exports = catchasync(async (req, _, next) => {
  try {
    const user = req.user;
    if (!user)
      throw new GeneralError({
        type: 'verified-status',
        msg: 'Hubo un error mediante la autenticación. Por favor, inicie sesión nuevamente.',
        statusCode: 401,
      });
    if (user.verified) next();
    else
      throw new GeneralError({
        type: 'verified-status',
        msg: 'Por favor, verifica tu cuenta para poder realizar esta acción.',
        statusCode: 403,
      });
  } catch (err) {
    next(err);
  }
});
