const catchasync = require('../helpers/catchasync');
const GeneralError = require('../helpers/errors');

module.exports = catchasync(async (req, _, next) => {
  try {
    const user = req.user;
    if (!user)
      throw new GeneralError({
        type: 'unauthorized',
        msg: 'An error has ocurred to get the user. Please, try again later',
        statusCode: 401,
      });
    if (Number(user.id) === Number(req.params.id)) next();
    else
      throw new GeneralError({
        type: 'forbidden',
        msg: 'You dont have permission to access this resource',
        statusCode: 401,
      });
  } catch (error) {
    next(error);
  }
});
