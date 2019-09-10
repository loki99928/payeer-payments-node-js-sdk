const base = require("./base.js");
const workingPayment = require("./workingPayment.js");
const request = require('request');

function Wallet() {
  
  // authorization check
  this.isAuth = function(accountNumber, apiId, apiKey) {        
    return new Promise((resolve, reject) => {
      base.sendNewRequest({
        url: "/ajax/api/api.php",
        method: 'POST',
        body: `account=${accountNumber}&apiId=${apiId}&apiPass=${apiKey}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }, function() { 
        if (JSON.parse(this.response.body).auth_error) {
          console.log(JSON.parse(this.response.body).errors)
          reject(false)
        } else {
          resolve(true);     
        }       
      });
    });    
  }; 

  // create payment
  this.createPayment = function(formBody) {  
    const body = formBody;
    return new Promise((resolve, reject) => {
      const desc = workingPayment.workingPayment.base64encode(body.m_desc);
      body.m_desc = desc;
      const hash = workingPayment.workingPayment.sha256(body);
      body.m_sign = hash;
      body.m_amount = (+formBody.m_amount).toFixed(2);
      const url = `${base.Config.MONEY_URL}/merchant/?m_shop=${body.m_shop}&m_orderid=${body.m_orderid}&m_amount=${body.m_amount}&m_curr=${body.m_curr}&m_desc=${body.m_desc}&m_sign=${body.m_sign}&lang=ru`;
      resolve(url);
    });
  }; 
}

module.exports.Wallet = Wallet;
