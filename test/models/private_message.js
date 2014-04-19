var assert = require('assert')
  , tests
  , PrivateMessage = geddy.model.PrivateMessage;

tests = {

  'after': function (next) {
    // cleanup DB
    PrivateMessage.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var privatemessage = PrivateMessage.create({});
    privatemessage.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
