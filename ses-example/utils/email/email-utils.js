const fs = require('fs');
const path = require('path');
const constants = require('../constants');

const DEFAULT_EXTENSION = '.html';
const BASE_PATH = `${constants.WORKING_DIR}/utils/email/templates`;

async function getTemplateContent(identifier) {
	const templatePath = path.format({
		dir: BASE_PATH,
		name: identifier,
		ext: DEFAULT_EXTENSION,
	});

	return new Promise((resolve, reject) => {
		fs.readFile(templatePath, 'utf8', (err, data) => {
			if (err) {
				return reject(err);
			}

			return resolve(data);
		});
	});
}

function bindContent(template, content) {
	const pattern = new RegExp('{{(\\w*)}}');
	const searchPattern = new RegExp(pattern, 'g');

	return template.replace(searchPattern, (match) => {
		const matchedKey = pattern.exec(match).pop();
		const { value = '' } = content.find(({ key }) => key === matchedKey) || {};

		return value;
	});
}

async function mountTemplate(templateId, content = []) {
	const template = await getTemplateContent(templateId);
	return !content.length ? template : bindContent(template, content);
}

module.exports = {
	getTemplateContent,
	bindContent,
	mountTemplate,
};
