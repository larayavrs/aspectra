const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const limiter = require('./middlewares/limiter');
const config = require('./config');
const cookieParser = require('cookie-parser');

// setting up the application
const app = express();
const dev = config.global.env !== 'production';

app.set('port', config.global.port);
app.set('env', config.global.env);

// middlewares
app.use(cors(dev ? { origin: true, credentials: true } : config.cors));
app.use(cookieParser({ httpOnly: true, secure: !dev }));
app.use(morgan(config.global.env === 'development' ? 'dev' : 'combined'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: config.global.max_body_size }));
app.use(limiter.standard);
app.use(
  compression({
    level: 9,
    threshold: 0,
    filter: (req, res) => {
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    },
  }),
);

// routes
app.use(
  '/public/',
  express.static('public', { maxAge: '1y', etag: false, immutable: true }),
);
app.use('/api/v1', require('./routes'));

// handlers
app.use(require('./handlers/notfound')); // unexpected routes handler
app.use(require('./handlers/error')); // error handler

// listening to the server
app.listen(config.global.port, async () => {
  try {
    console.log(
      `Server running on port ${config.global.port} with env ${config.global.env}`,
    );
  } catch (error) {
    console.error(error);
  }
});
