var Users = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.User.all(function(err, users) {
      if (err) { throw err; }
      self.respondWith(users, {type:'User'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this;
    var user = geddy.model.User.create(params);

    if (!user.isValid()) {
      this.respondWith(user);
    } else {
      user.save(function(err, data) {
        if (err) { throw err; }
        self.respondWith(user, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    if (params['withMessages']) {
      console.log(req.headers);
      geddy.model.User.firstWithMsgs(params.id, respondWithMsgs);
    } else {
      geddy.model.User.first(params.id, respond);
    }

    function respond(err, data) {
      if (err) { throw err; }
      if (!data) { throw new geddy.errors.NotFoundError(); }
      self.respondWith(data);
    }

    function respondWithMsgs(err, data) {
      if (err) { throw err; }
      if (!data) { throw new geddy.errors.NotFoundError(); }
      self.respond(data, {template: 'showWithDetails'});
    }
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      if (err) { throw err; }
      if (!user) {
        throw new geddy.errors.BadRequestError();
      } else {
        self.respondWith(user);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      if (err) { throw err; }
      user.updateProperties(params);

      if (!user.isValid()) {
        self.respondWith(user);
      } else {
        user.save(function(err, data) {
          if (err) { throw err; }
          self.respondWith(user, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.User.first(params.id, function(err, user) {
      if (err) { throw err; }
      if (!user) {
        throw new geddy.errors.BadRequestError();
      } else {
        geddy.model.User.remove(params.id, function(err) {
          if (err) { throw err; }
          self.respondWith(user);
        });
      }
    });
  };

  // non-standard methods

  this.getUserMessages = function (req, resp, params) {
    var self = this;

    geddy.model.User.firstWithMsgs(params.id, respond);

    function respond(err, data) {
      if (err) { throw err; }
      self.respond(data.user.messages);
    }
  };

};

exports.Users = Users;
