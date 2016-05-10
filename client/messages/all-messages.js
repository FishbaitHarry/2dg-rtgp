Template.allMessages.helpers({
    messages: function () {
        return Messages.find({}, {
            sort: {createdAt: 1},
            limit: 100
        });
    }
});
