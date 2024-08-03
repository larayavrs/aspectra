const router = require('express').Router();

// required modules
const users_controller = require('../controllers/users');
const users_check = require('../checks/users');

// middlewares
const validator = require('../middlewares/validator');

// setting up routes
router.post(
  '/register',
  validator(users_check.create),
  users_controller.create,
);

// exporting the router
module.exports = router;
