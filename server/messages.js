UserMessages = new Mongo.Collection("messages");

Meteor.startup(function () {
    UserMessages.insert({
        content: 'asdfasdfasdf',
        createdAt: new Date()
    });
});
