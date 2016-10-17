var request = require('request');
_ = require("underscore");

var OddsClient = function(apiKey, bookmakersIds, params, type, method, format){
  this.params = params || {};
  this.params['apiKey'] = apiKey;
  this.bookmakersIds = bookmakersIds;
  this.type = type || 'prematch';
  this.method = method || 'get';
  this.format = format || 'json';
  this.lastResponse = null;
  this.lastUpdatedAt = null;

  this.execute = function(cb){

    if (this.lastUpdatedAt != null){
      this.params['lastUpdatedAt'] = this.lastUpdatedAt;
    }

    var url = this.apiEndPointUrl();

    var options = {
      headers: {
        'Content-Type': 'text/'+this.format,
        'Accept': 'application/'+this.format,
        'Accept-Encoding': 'gzip'
      }
    };

    if (options['headers'] && 
          options['headers']['Accept-Encoding'] && 
            options['headers']['Accept-Encoding'].indexOf('gzip') != -1){
      options['gzip'] = true;
    }
    
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
      if (response.statusCode == 200){
        self.lastUpdatedAt = new Date().getTime();
      }

      if(cb){ cb(error, response, body); }
    });
  },

  this.sendPost = function(url, options, cb){
    var self = this;
    options['url'] = url;
    options['body'] = JSON.stringify(this.params);
    
    request.post(options, function (error, response, body) {
      self.lastResponse = response;
      if (response.statusCode == 200){
        self.lastUpdatedAt = new Date().getTime();
      }
      if(cb){ cb(error, response, body); }
    });
  },

  this.apiEndPointUrl = function(){
    var url = "https://api-{type}.oddsmarket.org/v1/bookmakers/{bkIds}/odds";
    return url.replace("{type}", { 'prematch': 'pr', 'live': 'lv' }[this.type])
              .replace("{bkIds}", this.bookmakersIds.join(','));
  }
};

module.exports = OddsClient;