const Joi = require('@hapi/joi');
const emailService = require('./service/email-service');

let response;

exports.sendEmail = async (event) => {
	const body = JSON.parse(event.body);

	const requestSchema = Joi.object({
		template: Joi.string().required(),
		emails: Joi.array().items(Joi.string()).required(),
	});

	try {
		await requestSchema.validateAsync(body);
		await emailService.sendMail(body.template, { emails: body.emails });
	} catch (err) {
		console.log(err);
		return err;
	}

	return response;
};
