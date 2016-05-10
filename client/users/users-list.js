Template.users.helpers({
    canEditRoles: function() {
        return checkPrivilege(Meteor.user(), 'admin');
    },
    users: function () {
        return Meteor.users.find({});
    }
});
