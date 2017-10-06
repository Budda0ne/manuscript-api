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
    let handler = { get(target, propKey, receiver) {
        return function(args) {
          args = args || {};
          if (target[propKey]) {
            return target[propKey](args)
          }
          return target.makeRequest(propKey, args)
        }
      }
    }
    return new Proxy(this, handler)
  };
  
  async isValid() {
    let response =  await rp({method: 'POST', url: this.url + "logon", json: {token: this.token}} )

    return response.data.token === this.token
  }


  makeRequest (command, options) {
    Object.assign(options, {token: this.token})

    return rp({method: 'POST', url: this.url + command, json: options} )
      .then(function(body){
        if (body.data) {
          return Promise.resolve(body.data);
        } 
      }).catch(function(err){
        if (err.error) {
          return Promise.reject({errors: err.error});
        }
    });
  }

}