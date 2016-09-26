var request = require('request');
_ = require("underscore");

var EventResultsClient = function(apiKey, params, method, format){
  this.params = params || {};
  this.params['apiKey'] = apiKey;
  this.apiKey = apiKey;
  this.method = method || 'get';
  this.format = format || 'json';
  this.lastResponse = null;

  this.execute = function(cb){
    if (this.lastUpdatedAt != null){
      this.params['lastUpdatedAt'] = this.lastUpdatedAt;
    }

    var url = this.apiEndPointUrl();

    var options = {
      headers: {
        'Content-Type': 'text/'+this.format,
        'Accept': 'application/'+this.format,
      }
    };
    
    if (this.lastResponse != null && this.lastResponse.headers['etag']){
      options.headers['If-None-Match'] = this.lastResponse.headers['etag']; 
    }
    if (this.method == 'get'){
      this.sendGet(url, options, cb);
    }else{
      this.sendPost(url, options, cb);
    }
  },

  this.sendGet = function(url, options, cb){
    var self = this;
    options['url'] = url + "?" + _.map(this.params, function(v, k) { return k+"="+encodeURIComponent(v); }).join("&");
    request.get(options, function (error, response, body) {
      self.lastResponse = response;
      if(cb){ cb(error, response, body); }
    });
  },
  
  this.sendPost = function(url, options, cb){
    delete this.params['apiKey'];
    var self = this;
    options['url'] = url + "?apiKey=" + this.apiKey;
    options['body'] = JSON.stringify(this.params);
    
    request.post(options, function (error, response, body) {
      self.lastResponse = response;
      if(cb){ cb(error, response, body); }
    });
  },

  this.apiEndPointUrl = function(){
    return "https://api-mst.oddsmarket.org/v1/eventResults";
  }
}

module.exports = EventResultsClient;