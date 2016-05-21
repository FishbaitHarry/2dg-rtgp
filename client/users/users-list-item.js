Template.usersListItem.helpers({
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

Template.usersListItem.events({
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
    "input select[name=role]": function(event) {
        var newRole = $(event.target).val();
        Meteor.call('Users.updateUserRole', this._id, newRole, onSuccess);
        function onSuccess() {}
    },
    "blur input[name=factionName]": function(event) {
        var newFactionName = $(event.target).val();
        Meteor.call('Users.updateFactionName', this._id, newFactionName, onSuccess);
        function onSuccess() {}
    },
    "click .delete": function () {
        Meteor.users.remove(this._id);
    }
});
