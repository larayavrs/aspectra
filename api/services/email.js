const GeneralError = require('../helpers/errors');
const config = require('../config');
const path = require('path');
const ejs = require('ejs');
const { createTransport } = require('nodemailer');

module.exports = {
  transport: createTransport({
    service: config.email.service,
    auth: {
      user: config.email.address,
      pass: config.email.password,
    },
  }),
  verify_credentials: async () => {
    try {
      await module.exports.transport.verify();
      console.info('Correo electrónico verificado correctamente.');
    } catch (err) {
      throw new GeneralError({
        type: 'email_error',
        msg: 'Credenciales de correo electrónico inválidas.',
        statusCode: 500,
        errors: err,
      });
    }
  },

  send: async ({ to, subject = 'ASPECTRA', template_name, context = {} }) => {
    const transporter = module.exports.transport;
    const template_path = path.join(path.resolve(), 'views', template_name);
    if (!template_path)
      throw new GeneralError({
        type: 'not_found',
        msg: 'No se encontró la plantilla.',
        statusCode: 404,
      });
    const html = await ejs.renderFile(template_path, context);
    const response = await transporter.sendMail({
      from: config.email.address,
      to,
      subject,
      html,
    });
    return response;
  },
};
