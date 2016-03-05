Meteor.methods({
    'Users.updateUserRole': function(userId, role) {
        if(!checkPrivilege(Meteor.user(), 'admin')) {
            throw new Meteor.Error('unauthorized', 'Not authorized.');
        }
        Meteor.users.update(userId, {
            $set: {'profile.role': role}
        });
    }
});

function checkPrivilege(user, role) {
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
