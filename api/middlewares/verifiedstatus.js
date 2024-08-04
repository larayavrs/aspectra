const catchasync = require('../helpers/catchasync');
const GeneralError = require('../helpers/errors');

module.exports = catchasync(async (req, _, next) => {
  try {
    const user = req.user;
    if (!user)
      throw new GeneralError({
        type: 'verified-status',
        msg: 'An error occurred while verifying the user status. Please try again later.',
        statusCode: 401,
      });
    if (user.verified) next();
    else
      throw new GeneralError({
        type: 'verified-status',
        msg: 'Please verify your email address to access this resource.',
        statusCode: 403,
      });
  } catch (err) {
    next(err);
  }
});
