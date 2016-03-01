Template.header.events({
    'click nav a': function (event) {
        var href = event.target.href;
        var targetPage = href.slice(href.indexOf('#') + 1);
        Session.set('page', targetPage);
    }
});
