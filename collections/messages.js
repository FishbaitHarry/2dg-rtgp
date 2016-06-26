Messages = new Mongo.Collection("messages");
Messages.schema = new SimpleSchema({
    content: {type: String},
    createdAt: {type: Date},
    sender: {type: String, regEx: SimpleSchema.RegEx.Id},
    senderName: {type: String},
    recipent: {type: String, regEx: SimpleSchema.RegEx.Id},
    recipentName: {type: String}
});
Messages.attachSchema(Messages.schema);

if (Meteor.isServer) {
    Meteor.publish('Messages.myMessages', function() {
      if (!this.userId) {
        return this.ready();
      }
      return Messages.find({
        $or: [{recipent: this.userId},{sender: this.userId}]
      }, {
        sort: {createdAt: -1},
        limit: 100
      });
    });
    Meteor.publish('Messages.allMessages', function() {
      if(!checkPrivilege(this.userId, 'admin')) {
        return this.ready();
      }
      return Messages.find({}, {
        sort: {createdAt: -1},
        limit: 100
      });
    });
}
