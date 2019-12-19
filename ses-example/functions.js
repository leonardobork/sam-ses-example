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
	const requestSchema = Joi.object({
		template: Joi.string().required()
	})

	try {
		console.log(event)
		const value = requestSchema.validateAsync(event.body)
		await emailService.sendMail(event.body.template, {})
	} catch (err) {
		console.log(err);
		return err;
	}

	return response
};
