"use strict";

var express = require('express');

var router = express.Router();

var braintree = require('braintree');

router.post('/', function (req, res, next) {
  var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'x5s6pdjdk7cky4x3',
    publicKey: 'kdvrzv2d2hq8hqgw',
    privateKey: '440f46da6d61b9ce7a4110862069741f'
  }); // Use the payment method nonce here

  var nonceFromTheClient = req.body.paymentMethodNonce; // Create a new transaction for $10

  var newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function (error, result) {
    if (result) {
      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});
module.exports = router;