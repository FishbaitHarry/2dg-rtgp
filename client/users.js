Template.registerHelper('userSelect', function(status) {
    var users = Meteor.users.find({}, {
        fields: {'_id':1, 'username':1}
    });
    return users.map((user) => ({label: user.username, value: user._id}));
});

Template.registerHelper('isMaster', function() {
    return checkPrivilege(Meteor.user(), 'master');
})

Template.users.helpers({
    canEditRoles: function() {
        return checkPrivilege(Meteor.user(), 'admin');
    },
    users: function () {
        return Meteor.users.find({});
    }
});

Template.user.helpers({
    canEditRoles: function() {
        return checkPrivilege(Meteor.user(), 'admin');
    },
    isUser: function() {
        return this.profile.role == 'user';
    },
    isMaster: function() {
        return this.profile.role == 'master';
    },
    isAdmin: function() {
        return this.profile.role == 'admin';
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
    "input select": function(event) {
        var newRole = $(event.target).val();
        Meteor.call('Users.updateUserRole', this._id, newRole, onSuccess);
        function onSuccess() {
            console.log(newRole)
        }
    },
    "click .delete": function () {
        Meteor.users.remove(this._id);
    }
});
