var PrivateMessages = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.PrivateMessage.all(function(err, privateMessages) {
      if (err) { throw err; }
      self.respondWith(privateMessages, {type:'PrivateMessage'});
    });
  };

  this.add = function (req, resp, params) {
    var self = this;
    geddy.model.User.all(function(err,data) {
      if (err) { throw err; }
      self.respond({params: params, users: data});
    });
  };

  this.create = function (req, resp, params) {
    var self = this;
    var privateMessage = geddy.model.PrivateMessage.create(params);
    var recipents = params['to'] || [];

    if (!privateMessage.isValid()) {
      this.respondWith(privateMessage);
    } else {
      privateMessage.save(onSaved);
    }
    function onSaved(err, data) {
      if (err) { throw err; }
      privateMessage.deliverTo(recipents); // add association
      self.respondWith(privateMessage, {status: err});
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.PrivateMessage.first(params.id, function(err, privateMessage) {
      if (err) {
        throw err;
      }
      if (!privateMessage) {
        throw new geddy.errors.NotFoundError();
      } else {
        self.respondWith(privateMessage);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.PrivateMessage.first(params.id, function(err, privateMessage) {
      if (err) { throw err; }
      if (!privateMessage) {
        throw new geddy.errors.BadRequestError();
      } else {
        geddy.model.User.all(function(err, data) {
          if (err) { throw err; }
          self.respond({privateMessage: privateMessage, users: data});
        });
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.PrivateMessage.first(params.id, function(err, privateMessage) {
      if (err) {
        throw err;
      }
      privateMessage.updateProperties(params);

      if (!privateMessage.isValid()) {
        self.respondWith(privateMessage);
      } else {
        privateMessage.save(function(err, data) {
          if (err) { throw err; }
          self.respondWith(privateMessage, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.PrivateMessage.first(params.id, function(err, privateMessage) {
      if (err) { throw err; }
      if (!privateMessage) {
        throw new geddy.errors.BadRequestError();
      } else {
        geddy.model.PrivateMessage.remove(params.id, function(err) {
          if (err) { throw err; }
          self.respondWith(privateMessage);
        });
      }
    });
  };

};

exports.PrivateMessages = PrivateMessages;
