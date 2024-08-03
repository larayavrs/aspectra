const { User } = require('../database/models');

/**
 * @description Users service
 */
module.exports = {
  /**
   * @description Sequelize model
   * @type {Object}
   */
  model: User,

  /**
   * @description Get all users
   * @returns {Promise<Array>}
   */
  get: async () => await User.findAll(),

  /**
   * @description Find user by options
   * @param {Object} options - Sequelize options which will be used to find user
   * @param {Boolean} secure - Secure mode (without password)
   * @returns {Promise<Object>}
   */
  find_by: async (options, secure = true) =>
    secure
      ? await User.findOne(options)
      : await User.scope('withPassword').findOne(options),

  /**
   * @description Find user by id
   * @param {Number} id - User id
   * @returns {Promise<Object>}
   */
  find_by_id: async (id, options) => await User.findByPk(id, { ...options }),

  /**
   * @description Create user
   * @param {Object} data - User data
   * @returns {Promise<Object>}
   */
  create: async (data) => {
    try {
      return await User.create(data);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Correo electrónico ya registrado');
      }
      if (error.name === 'SequelizeValidationError') {
        throw new Error('Datos inválidos');
      }
    }
  },

  /**
   * @description Update user
   * @param {Object} data - User data
   * @param {Number} id - User id
   * @returns {Promise<Object>}
   */
  update: async (data, id) => await User.update(data, { where: { id } }),

  /**
   * @description Delete user
   * @param {Number} id - User id
   * @returns {Promise<Object>}
   */
  delete: async (id) => await User.destroy({ where: { id } }),
};
