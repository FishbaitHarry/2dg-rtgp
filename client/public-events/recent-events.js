
Template.recentEvents.helpers({
    events: function() {
        return PublicEvents.find({}, {sort: {createdAt: -1}});
    }
});
