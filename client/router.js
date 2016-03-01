Template.body.helpers({
    pageTemplate: function() {
        return Session.get('page') || 'index';
    }
});
