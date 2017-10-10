/* global Proxy */
var rp = require('request-promise-native');
var urljoin = require('url-join');

module.exports = init; 

function init(site, token) {
  return new Manuscript(site, token).proxify();
}

class Manuscript { 
  
  constructor(site, token) {
    Object.assign(this, {token:token, site:site, url: urljoin(site + "/api/")})
  }

  proxify() {
    console.log('proxify')
    let handler = {
      get(target, property, receiver) {
        return function() {
          //args = args || {};
          if (property in target) {
            return target[property](...arguments)
          }
          return target.makeRequest(property, ...arguments)
        }
      }
    }
    return new Proxy(this, handler)
  };
  
  async isValid() {
    try {
      let response =  await rp({
        method: 'POST', 
        url: this.url + "logon", 
        json: {token: this.token}
      } );
      return response.data.token === this.token;

    } catch (err) {
      return false;
    }
  }


  async makeRequest (command, options = {}) {
    options.token = this.token;
    
    try {
      let body = await rp({
        method: 'POST',
        url: this.url + command,
        json: options});
      return body.data;
    } catch(ex) {
      let errors = ex.error && ex.error.errors || [];
      throw {errors: errors};
    }
  }
}


