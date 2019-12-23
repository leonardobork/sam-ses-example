const Joi = require('@hapi/joi');
const emailService = require('./service/email-service');

exports.sendEmail = async (event) => {
	const body = event && event.body ? JSON.parse(event.body) : {}

	const requestSchema = Joi.object({
		template: Joi.string().required(),
		emails: Joi.array().items(Joi.string()).required(),
	});

	try {
		await requestSchema.validateAsync(body);
		await emailService.sendMail(body.template, { emails: body.emails });

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Emails sent successfully',
			}),
		};
	} catch (err) {
		console.log(err)
		return {
			statusCode: 400,
			body: JSON.stringify({
				err: 'Oops.. something wrong happened'
			}),
		};
	}
};
