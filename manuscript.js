/* global Proxy */
var rp = require('request-promise-native');
var urljoin = require('url-join');

function init(site, token) {
  return new Manuscript(site, token).proxify();
}

var Manuscript = function(site, token) { 
  Object.assign(this, {token:token, site:site, url: urljoin(site + "/f/api/0/jsonapi")})
}

Manuscript.prototype.proxify = function () {
  return new Proxy(this, this.handler)
};

Manuscript.prototype.handler = {
  get(target, propKey, receiver) {
    return function(args) {
      args = args || {}
      return target.makeRequest(propKey, args)
    }
  }
};

Manuscript.prototype.makeRequest = function (command, options) {
  Object.assign(options, {token: this.token, cmd: command})

  return rp({method: 'POST', url: this.url, json: options} )
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

module.exports = init; 