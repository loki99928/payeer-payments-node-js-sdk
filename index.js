const base = require("./lib/base.js");
const wallet = require("./lib/wallet.js");
const workingPayment = require("./lib/workingPayment.js");

module.exports = {
  Wallet: wallet.Wallet,
  workingPayment: workingPayment.workingPayment,
  Config: base.Config
}