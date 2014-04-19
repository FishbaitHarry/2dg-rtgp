var CreatePrivateMessages = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('content', 'string');
          t.column('status', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('private_message', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('private_message', callback);
  };
};

exports.CreatePrivateMessages = CreatePrivateMessages;
