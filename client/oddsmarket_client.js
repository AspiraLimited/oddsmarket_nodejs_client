var request = require('request');
_ = require("underscore");

var EventResultsClient = function(format){
  this.params = {};
  this.format = format || 'json';
  this.lastResponse = null;

  this.sports = function(cb){
    var url = this.apiSportsEndPointUrl();

    var options = {
      headers: {
        'Content-Type': 'text/'+this.format,
        'Accept': 'application/'+this.format,
      }
    };
    
    this.sendGet(url, options, cb);
  },

  this.bookmakers = function(cb){
    var url = this.apiBookmakersEndPointUrl();
    
    var options = {
      headers: {
        'Content-Type': 'text/'+this.format,
        'Accept': 'application/'+this.format,
      }
    };
    
    this.sendGet(url, options, cb);
  },

  this.sendGet = function(url, options, cb){
    options['url'] = url + "?" + _.map(this.params, function(v, k) { return k+"="+encodeURIComponent(v); }).join("&");
    request.get(options, function (error, response, body) {
      if(cb){ cb(error, response, body); }
    });
  },
  

  this.apiSportsEndPointUrl = function(){
    return "https://api-mst.oddsmarket.org/v1/sports";
  },

  this.apiBookmakersEndPointUrl = function(){
    return "https://api-mst.oddsmarket.org/v1/bookmakers";
  }
}

module.exports = EventResultsClient;