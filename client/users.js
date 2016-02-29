
Template.users.helpers({
    users: function () {
        return Meteor.users.find({});
    }
});

Template.user.events({
    "submit .send-message": function (event) {
        event.preventDefault();
        var text = event.target.text.value;

        Messages.insert({
            content: text,
            createdAt: new Date(),
            sender: Meteor.userId(),
            senderName: Meteor.user().username,
            recipent: this._id,
            recipentName: this.username
        });

        event.target.text.value = "";
    },
    "click .delete": function () {
        Messages.remove(this._id);
    }
});
