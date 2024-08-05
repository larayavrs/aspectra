const bcrypt = require('bcrypt');

/* required configuration value */
const { salt_round } = require('../config').security;

/* methods */
module.exports = {
  /**
   * @description Encrypts or hash the given data
   * @param {String} password - Password to hash
   * @returns {Promise<String>}
   */
  hash: async (password) => await bcrypt.hash(password, salt_round),

  /**
   * @description Compares the given data with the hashed data
   * @param {String} password - Password to compare
   * @param {String} hash - Hashed password
   * @returns {Promise<Boolean>}
   */
  compare: async (password, hash) => await bcrypt.compare(password, hash),
};
