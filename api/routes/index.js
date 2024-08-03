const router = require('express').Router();
const config = require('../config');

// setting up the routes
router.get('/', (__, res) => res.send(`${config.global.app_name} API!`));
router.use('/users', require('./users'));

// exporting the router
module.exports = router;
