var User = function () {

  this.defineProperties({
    name:      {type: 'string', required: true},
    email:     {type: 'string', required: true},
    password:  {type: 'string'},
    role:      {type: 'string'},
    lastLogin: {type: 'time'}
  });

  this.validatesLength('name', {min: 3});
  this.validatesFormat('role', /admin|master|user/, {message: 'Illegal role!'});

  this.hasMany('MessageDeliveries');
  this.hasMany('PrivateMessages', {through: 'MessageDeliveries'});
  //this.hasMany('SentMessages', {model: 'PrivateMessages'});

  /*
  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

User.login = function login(email, password, callback) {
  User.first({email:email}, userFound);
  function userFound(err, user) {
    // validate password here
    callback(err, user);
  }
};

User.firstWithMsgs = function (id, callback) {
  var user = null;
  this.first(id, gotUser);

  function gotUser(err, userData) {
    if (err) { callback(err); }
    else if (!userData) {
      callback(new geddy.errors.NotFoundError());
    } else {
      user = userData;
      user.getPrivateMessages(gotPrivs);
    }
  }

  function gotPrivs(err, privMsgs) {
    var responseData = {user: user.toJSON()};
    responseData.user.messages = privMsgs;
    callback(err, responseData);
  }
};

/*
// Can also define them on the prototype
User.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
User.someStaticProperty = 'YYZ';
*/

User = geddy.model.register('User', User);
