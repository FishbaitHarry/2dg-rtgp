Template.registerHelper('userSelect', function(status) {
    var users = Meteor.users.find({}, {
        fields: {'_id':1, 'username':1}
    });
    return users.map((user) => ({label: user.username, value: user._id}));
});

Template.registerHelper('isMaster', function() {
    return checkPrivilege(Meteor.user(), 'master');
})
