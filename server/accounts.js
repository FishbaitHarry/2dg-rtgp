Accounts.onCreateUser(function(options, user) {
    var adminExists = Meteor.users.findOne({'profile.role': 'admin'});
    // set default role
    user.profile = user.profile || {};
    if (adminExists) {
        user.profile.role = 'user';
    } else {
        user.profile.role = 'admin';
    }
    return user;
});
