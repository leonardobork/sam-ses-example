const emailUtils = require('../../../utils/email/email-utils')
const chai = require('chai');
const expect = chai.expect;

const TEMPLATE_NAME = 'template-example';

const CODE_VALUE = `TEST_${ Math.random() * 1000 }`;
const CONTENT_OBJECT = [{ key: 'code', value: CODE_VALUE }];

describe('Tests Email Utils', () => {
  it('verifies if templates are being fetched', async () => {
    const TEMPLATE_LENGTH = 15685;
    const template = await emailUtils.getTemplateContent(TEMPLATE_NAME);
    
    expect(template).to.be.an('string');
    expect(template.length).to.equal(TEMPLATE_LENGTH)
  });

  it('verifies if content is being binded in templates', async () => {
    const MATCH_REGEX = new RegExp(CODE_VALUE, 'g');

    const template = await emailUtils.getTemplateContent(TEMPLATE_NAME);

    const bindedTemplate = emailUtils.bindContent(template, CONTENT_OBJECT);

    expect(bindedTemplate).to.match(MATCH_REGEX);
    expect(bindedTemplate).to.be.an('string');
  });

  it('verifies if template is being mounted correctly', async () => {
    const MATCH_REGEX = new RegExp(CODE_VALUE, 'g');

    const mountedTemplate = await emailUtils.mountTemplate(TEMPLATE_NAME, CONTENT_OBJECT);

    expect(mountedTemplate).to.match(MATCH_REGEX);
    expect(mountedTemplate).to.be.an('string');
  });
});
