var PrivateMessage = function () {

  this.defineProperties({
    content: {type: 'string'}
  });

  this.validatesLength('content', {min: 5});
  // this.validatesWithFunction('status', function (status) {
  //   return status == 'unread' || status == 'read';
  // }, {message: "Invalid status type."});

  this.hasMany('MessageDeliveries');
  this.hasMany('Users', {through: 'MessageDeliveries'});
  this.belongsTo('SentMessage', {model: 'User'});

  /*
  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

PrivateMessage.prototype.deliverTo = function deliverTo(recipents) {
  recipents.forEach(addDelivery, this);
  function addDelivery(userId) {
    var delivery = geddy.model.MessageDelivery.create({
      userId: userId, privateMessageId: this.id
    });
    delivery.save();
  }
}

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
