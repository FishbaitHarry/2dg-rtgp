var MessageDelivery = function () {

  this.defineProperties({
    
  });

  this.belongsTo('Users');
  this.belongsTo('PrivateMessages');

};

exports.MessageDelivery = MessageDelivery;
