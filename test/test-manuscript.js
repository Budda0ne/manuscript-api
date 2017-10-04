/* global it */
/* global describe */
require('dotenv').config()
var chai = require('chai');
var expect = chai.expect;

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Greatware API', function(){
  describe('Valid Credentials', function(){
    var string = Date.now().toString()
    var mscript = require('../manuscript')(process.env.SITE, process.env.TOKEN)  
    
    it('should create a new case', function() {
      var result = mscript.new({sTitle:string}); 
      return expect(result).to.eventually.have.property('case');
    });
    
    it('should search for a case by title', function() {
      var search = "title:" + string;
      var result = mscript.search({q:search});
      return expect(result).to.eventually.have.property('count');
    });
    
  })
  
  describe('Invalid Credentials', function(){
    var string = Date.now().toString()
    var mscript = require('../manuscript')(process.env.WRONG_SITE, process.env.WRONG_TOKEN)  
    
    it('should be rejected with invalid credentials', function() {
      var result = mscript.new({sTitle:string}); 
      return expect(result).to.be.rejected;
    });
    
  })
})



