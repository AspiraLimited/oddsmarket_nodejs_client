var OddsClient = require("./client/odds_client");
var ArbsClient = require("./client/arbs_client");
var EventResultsClient = require("./client/event_results_client");
var OddsMarketClient = require("./client/oddsmarket_client");

var API_KEY = 'YOU_API_KEY_HERE';

var odds = new OddsClient(API_KEY, [1], {}, 'prematch', 'post', 'json');

odds.execute(function(error, response, body){
  console.log(body);

  odds.execute(function(error, response, body){
    console.log(body);
  });
});

// var arbs = new ArbsClient(API_KEY, [1,2], {}, 'prematch', 'get', 'json');

// arbs.execute(function(error, response, body){
//   console.log(body);

//   arbs.execute(function(error, response, body){
//     console.log(body);
//   });
// });

// var results = new EventResultsClient(API_KEY, { sportIds: [1] }, 'post', 'json');

// results.execute(function(error, response, body){
//   console.log(body);

//   results.execute(function(error, response, body){
//     console.log(body);
//   });
// });

// var oddsMarket = new OddsMarketClient('json');

// oddsMarket.sports(function(error, response, body){
//   console.log(body);
// });

// oddsMarket.bookmakers(function(error, response, body){
//   console.log(body);
// });





