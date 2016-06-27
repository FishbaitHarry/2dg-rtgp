Meteor.methods({
    'Users.updateUserRole': function(userId, role) {
        if(!checkPrivilege(Meteor.user(), 'admin')) {
            throw new Meteor.Error('unauthorized', 'Not authorized.');
        }
        Meteor.users.update(userId, {
            $set: {'profile.role': role}
        });
    },
    'Users.updateFactionName': function(userId, factionName) {
        if(!checkPrivilege(Meteor.user(), 'admin')) {
            throw new Meteor.Error('unauthorized', 'Not authorized.');
        }
        Meteor.users.update(userId, {
            $set: {'profile.factionName': factionName}
        });
    },
});

// globally available helper function
checkPrivilege = function checkPrivilege(user, role) {
    if (typeof user == 'string') {
        user = Meteor.users.findOne(user);
    }
    try {
        var userRole = user.profile.role;
        if (role == 'user') return true;
        if (role == userRole) return true;
        if (userRole == 'admin') return true;
        return false;
    } catch (err) {
        return false;
    }
}

if (Meteor.isServer) {
    Meteor.publish('allUsers', function() {
        return Meteor.users.find();
    });
} else {
    Meteor.subscribe('allUsers');
}
