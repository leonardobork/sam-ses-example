const app = require('../../functions');
const chai = require('chai');
const expect = chai.expect;

const event = require('../../../events/event.json');
let context;

describe('Tests Lambda Functions', () => {
    /** 
     * Enable this once you've set up the envs
     */
    it('verifies good response', async () => {
        const result = await app.sendEmail(event, context);
        
        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.an('string');
        
        expect(result).to.be.an('object');
    });
    
    // it('verifies bad response', async () => {
    //     const result = await app.sendEmail(event, context);
    
    //     expect(result).to.be.an('object');
    //     expect(result.statusCode).to.equal(400);
    //     expect(result.body).to.be.an('string');
    
    //     expect(result).to.be.an('object');
    // });
});
