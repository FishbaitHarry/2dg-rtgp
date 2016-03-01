Template.allMessages.helpers({
    messages: function () {
        return Messages.find({}, {
            sort: {createdAt: 1},
            limit: 100
        });
    }
});

Template.personalMessages.helpers({
    personalMessages: function () {
        return Messages.find({
            $or: [{recipent: Meteor.userId()},{sender: Meteor.userId()}]
        }, {
            sort: {createdAt: -1},
            limit: 100
        });
    }
});

Template.message.events({
    "click .toggle-checked": function () {
        // Set the checked property to the opposite of its current value
        Messages.update(this._id, {
            $set: {
                checked: !this.checked
            }
        });
    },
    "click .delete": function () {
        Messages.remove(this._id);
    }
});
