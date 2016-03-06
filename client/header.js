Template.navigation.helpers({
    pageLinks: function() {
        var pageLinks = [];
        if (checkPrivilege(Meteor.user(), 'user')) {
            pageLinks.push(
                {template: "myMessages", label: "Moje Wiadomości"},
                {template: "users", label: "Użytkownicy"},
                {template: "myOrders", label: "Rozkazy"},
            );
        }
        if (checkPrivilege(Meteor.user(), 'master')) {
            pageLinks.push(
                {template: "allMessages", label: "Wszystkie Wiadomości"},
                {template: "allOrders", label: "Wszystkie Rozkazy"}
            );
        }
        return pageLinks;
    }
});

Template.navigation.events({
    'click .clickable a': function (event) {
        var href = event.target.href;
        var targetPage = href.slice(href.indexOf('#') + 1);
        Session.set('page', targetPage);
    }
});

Template.pageLink.helpers({
    classes: function() {
        var isActive = Session.get('page') == this.template;
        if (isActive) return 'active';
        return '';
    }
});

Template.pageLink.events({
    'click a': function(event) {
        event.preventDefault();
        Session.set('page', this.template);
    }
});
