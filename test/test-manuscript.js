/* global it */
/* global describe */
/* global beforeEach */
/* global afterEach */

require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const response = require('./mock-response');

let logonValidToken = {
  "data": {"token":"validtoken"},
  "errors":[],
  "warnings":[],
  "meta": {
    "jsdbInvalidator":"p0LLwfK3IkOEyisVD8iG1A2",
    "clientVersionAllowed":{"min":5,"max":5}
  },
  "errorCode":null,
  "maxCacheAge":null
}

describe("Require manuscript", () => {
  it("Require Manuscript: Returns a function when instantiated without parameters", () => {
      let manuscript = require('../manuscript');
      expect(manuscript).to.be.a("function");
  })
  
  it("Require Manuscript: Returns an object when instantiated with params", () => {
      let manuscript = require('../manuscript')("http://www.example.com", "faketoken")
      expect(manuscript).to.be.an('object');
  })
})

const apiEndpoint = 'https://www.example.com/'
nock.disableNetConnect();

describe('Function manuscript.isValid()', () => {
  let manuscript = require('../manuscript');
  beforeEach(() => {
    nock(`${apiEndpoint}api`)
      .post('/logon', JSON.stringify({token: "nosuchtoken"}))
      .reply(400, response.logonInvalidToken);
    
    nock(`${apiEndpoint}api`)
      .post('/logon', JSON.stringify({token: "validtoken"}))
      .reply(200, logonValidToken);
  });

  it('INVALID TOKEN:  Returns false given an invalid token', async () => {
    let mAPI = manuscript(apiEndpoint, "nosuchtoken")
    let result = await mAPI.isValid();
    expect(result).to.be.false;
  });
  
  it('VALID TOKEN:  Returns true given an valid token', async () => {
    let mAPI = manuscript(apiEndpoint, "validtoken")
    let result = await mAPI.isValid();
    expect(result).to.be.true;
  });
  
  
  afterEach(() => {
    nock.cleanAll()
  })
});

describe('Calling Manuscript API', () => {
  let manuscript = require('../manuscript');
  beforeEach(() => {
    nock.disableNetConnect();

    nock(`${apiEndpoint}api`)
      .post('/new', JSON.stringify({"token": "validtoken", "sTitle": "New Case Through API"}))
      .reply(200, response.new);
    
    nock(`${apiEndpoint}api`)
      .post('/nosuchcommand', JSON.stringify({token: "validtoken"}))
      .reply(400, response.noSuchCommand);
  });

  it('VALID DATA:  Returns a new case given valid data', async () => {
    let mAPI = manuscript(apiEndpoint, "validtoken")
    let result = await mAPI.new({"token": "validtoken", "sTitle": "New Case Through API"});
    expect(result).to.have.property('case')
  });
  
  it('INVALID ENDPOINT: Throws an error given an invalid command/endpoint', async () => {
    let mAPI = manuscript(apiEndpoint, "validtoken")
    try {
      let result = await mAPI.nosuchcommand();
    }
    catch (err) {
      expect(err).to.have.property('errors');
      expect(err.errors[0].message.includes('No such API command')).to.be.true
    }
  });
  
  
  afterEach(() => {
    nock.cleanAll()
  })
});




