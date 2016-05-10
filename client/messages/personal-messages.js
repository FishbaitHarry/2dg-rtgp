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
