var User = function () {

  this.defineProperties({
    name:      {type: 'string', required: true},
    email:     {type: 'string', required: true},
    password:  {type: 'string'},
    role:      {type: 'string'},
    lastLogin: {type: 'time'}
  });

  this.validatesLength('name', {min: 3});
  this.validatesLength('password', {min: 6});
  this.validatesFormat('role', /admin|master|user/, {message: 'Illegal role!'});

  this.hasMany('MessageDeliveries');
  this.hasMany('PrivateMessages', {through: 'MessageDeliveries'});
  this.hasMany('SentMessages', {model: 'PrivateMessages'});

};

User.login = function login(email, password, callback) {
  User.first({email:email}, userFound);
  function userFound(err, user) {
    if (!user || (user.password != password)) {
      callback(new geddy.errors.UnauthorizedError(), null);
    } else {
      updateLastLogin(user);
      callback(null, user);
    }
  }
  function updateLastLogin(user) {
    user.lastLogin = new Date();
    user.save();
  }
};

User.firstWithMsgs = function (id, callback) {
  var responseData = {};
  var user = null;
  this.first(id, gotUser);

  function gotUser(err, userData) {
    if (err) {
      callback(err);
    } else if (!userData) {
      callback(new geddy.errors.NotFoundError());
    } else {
      user = userData;
      responseData.user = userData.toJSON();
      userData.getPrivateMessages(gotPrivs);
    }
  }

  function gotPrivs(err, privMsgs) {
    responseData.user.messages = privMsgs;
    user.getSentMessages(gotSent);
  }

  function gotSent(err, sentMsgs) {
    responseData.user.sent = sentMsgs;
    callback(err, responseData);
  }
};

User.prototype.smartUpdateProperties = function(properties) {
  // do not save an empty password
  if (!properties.password) { delete properties.password; }
  this.updateProperties(properties);
};

User = geddy.model.register('User', User);
