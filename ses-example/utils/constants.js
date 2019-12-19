const { cwd } = require('process');

module.exports = {
  WORKING_DIR: cwd(),
  SMTP_CONFIG: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  LOGGER_TYPE: process.env.LOGGER_TYPE || 'dev'
};