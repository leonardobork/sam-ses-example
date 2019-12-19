// const axios = require('axios')
const Joi = require('@hapi/joi');
const emailService = require('./service/email-service')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.sendEmail = async (event, context) => {
	const body = JSON.parse(event.body)

	const requestSchema = Joi.object({
		template: Joi.string().required(),
		emails: Joi.array().items(Joi.string()).required()
	})

	try {
		await requestSchema.validateAsync(body)
		await emailService.sendMail(body.template, { emails: body.emails })
	} catch (err) {
		console.log(err);
		return err;
	}

	return response
};