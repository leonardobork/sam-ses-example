const nodemailer = require('nodemailer');
const constants = require('../utils/constants');
const { mountTemplate } = require('../utils/email/email-utils');

const transporter = nodemailer.createTransport(constants.SMTP_CONFIG);
const DEFAULT_FROM = '"Testing Email" <noreply@sounoro.co>';

/**
 *
 * @param {string} templateId
 * @param {object} options
 * @param {object} options.content
 * @param {object} options.emails
 * @param {object} options.subject
 */
async function sendMail(templateId, options) {
  const template = await mountTemplate(templateId, options.content);
  return transporter.sendMail({
    from: DEFAULT_FROM,
    to: options.emails.join(','),
    subject: options.subject,
    html: template,
  });
}

module.exports = { sendMail };