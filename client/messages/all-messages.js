Template.allMessages.onCreated(function() {
  Meteor.subscribe('Messages.allMessages');
});

Template.allMessages.helpers({
    messages: function () {
        return Messages.find({}, {
            sort: {createdAt: 1},
            limit: 100
        });
    }
});
