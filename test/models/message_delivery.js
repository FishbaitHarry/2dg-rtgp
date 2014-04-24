var assert = require('assert')
  , tests
  , MessageDelivery = geddy.model.MessageDelivery;

tests = {

  'after': function (next) {
    // cleanup DB
    MessageDelivery.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var messagedelivery = MessageDelivery.create({});
    messagedelivery.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
