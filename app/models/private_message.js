var PrivateMessage = function () {

  this.defineProperties({
    content: {type: 'string'},
    status: {type: 'string'}
  });

  this.validatesLength('content', {min: 5});
  this.validatesWithFunction('status', function (status) {
    return status == 'unread' || status == 'read';
  }, {message: "Invalid status type."});

  this.belongsTo('User');
  /*

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
PrivateMessage.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
PrivateMessage.someStaticMethod = function () {
  // Do some other stuff
};
PrivateMessage.someStaticProperty = 'YYZ';
*/

PrivateMessage = geddy.model.register('PrivateMessage', PrivateMessage);
