var request = require('request');
var querystring = require("querystring");

function Config() {
}

Config.MONEY_URL = "https://payeer.com";
// Config.SP_MONEY_URL = "https://sp-money.yandex.ru";

function sendNewRequest(params, callback) {
  var headers = params.headers || {};
  var body = params.body || {};
  var url = params.url;
  var method = params.method || 'GET';
  console.log(params);
  
  headers['User-Agent'] = "Payeer.Money.SDK/NodeJS";
  request({
    method: method,
    url:  Config.MONEY_URL + url, 
    headers: headers, 
    body: body
  }, callback);
}



// function processResponse(callback) {
//   return function httpCallback(error, response, body) {
//     if(error) {
//       callback(error);
//       return;
//     }
//     switch(response.statusCode) {
//       case 400: 
//         callback(new Error("Format error"));
//         break;
//       case 401:
//         callback(new Error("Token error"));
//         break;
//       case 403:
//         callback(new Error("Scope error"));
//         break;
//       default: 
//         callback(null, JSON.parse(body), response);
//     }
//   };
// }

module.exports = {
  Config: Config,
  sendNewRequest: sendNewRequest
  // processResponse: processResponse
};

