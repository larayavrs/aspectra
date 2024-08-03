let env = process.env;

if (!env.NODE_ENV) {
  require('dotenv').config();
  env = process.env;
}

module.exports = {
  global: {
    app_name: env.APP_NAME || 'SmartPOS Cloud',
    env: env.NODE_ENV || 'development',
    port: env.PORT || 3000,
    base_url: env.BASE_URL || 'http://localhost:3000',
    full_base_url: env.BASE_URL + '/api/v1' || 'http://localhost:3000/api/v1',
    front_url: env.FRONT_URL || 'http://localhost:8080',
    max_body_size: env.MAX_BODY_SIZE || '100kb',
    max_param_size: env.MAX_PARAM_SIZE || '100kb',
    providers: ['local'],
  },
  development: {
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT || 'mysql',
  },
  production: {
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT || 'mysql',
  },
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 3600,
  },
  payments: {
    paypal: {
      client_id: env.PAYPAL_CLIENT_ID,
      client_secret: env.PAYPAL_CLIENT_SECRET,
      mode: env.PAYPAL_MODE || 'sandbox',
      endpoint: env.PAYPAL_ENDPOINT || 'https://api.sandbox.paypal.com',
    },
  },
  email: {
    host: env.EMAIL_HOST,
    user: env.EMAIL_USER,
    password: env.EMAIL_PASSWORD,
    address: env.EMAIL_ADDRESS,
    service: env.EMAIL_SERVICE,
    port: env.EMAIL_PORT,
  },
  security: {
    salt_round: 10,
    limiter: {
      standard: {
        windowsMs: 15 * 60 * 1000,
        max: 2000,
      },
      strict: {
        windowsMs: 10 * 60 * 1000,
        max: 5,
      },
      super_strict: {
        windowsMs: 10 * 60 * 1000,
        max: 3,
      },
    },
    tokens: {
      secret: env.TOKEN_SECRET,
      access: {
        secret: env.ACCESS_TOKEN_SECRET,
        expire: env.ACCESS_TOKEN_EXPIRE || '1h',
      },
      refresh: {
        secret: env.REFRESH_TOKEN_SECRET,
        expire: env.REFRESH_TOKEN_EXPIRE || '7d',
      },
      email: {
        secret: env.EMAIL_TOKEN_SECRET,
        expire: env.EMAIL_TOKEN_EXPIRE || '30m',
      },
      reset_password: {
        secret: env.RESET_PASSWORD_TOKEN_SECRET,
        expire: env.RESET_PASSWORD_TOKEN_EXPIRE || '1d',
      },
    },
  },
};
