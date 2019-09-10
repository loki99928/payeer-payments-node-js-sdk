const base = require("./base.js");
const crypto = require('crypto');

function workingPayment(instanceId) {

};
// кодирование base64
workingPayment.base64encode = function(str) {
  if (typeof str !== 'string') {
    if (typeof str === 'number') {
      str = str.toString();
    } else {
      throw new Error('Text to encode must be a string or a number.');
    }
  }
  return Buffer.from(str, 'utf8').toString('base64');
};

// кодироние sha256
workingPayment.sha256 = function(formBody) {  
  formBody.m_amount = (+formBody.m_amount).toFixed(2);
  const objHash = Object.keys(formBody)        
  .map((key) => formBody[key])
  .join(":");
  let hash = crypto.createHash('sha256').update(objHash).digest('hex');
  hash = hash.toUpperCase(); 
  return hash;
};

module.exports.workingPayment = workingPayment;
