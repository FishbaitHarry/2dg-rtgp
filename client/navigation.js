var allPages = [
    {template: "recentEvents", label: "Wydarzenia"},
    {template: "myMessages", label: "Moje Wiadomości"},
    {template: "myOrders", label: "Moje Rozkazy"},
    {template: "myUnits", label: "Moje Oddziały"},
    {template: "listAreas", label: "Świat"},
    {template: "newBattle", label: "Rozegraj Bitwę"},
    {template: "usersList", label: "Użytkownicy"},
    {template: "allMessages", label: "Wszystkie Wiadomości", adminOnly: true},
    {template: "allOrders", label: "Wszystkie Rozkazy", adminOnly: true},
    {template: "addAreas", label: "Dodaj Obszary", adminOnly: true},
    {template: "allUnits", label: "Wszystkie Oddziały", adminOnly: true},
    {template: "addUnit", label: "Dodaj Oddział", adminOnly: true},
    {template: "createEvent", label: "Dodaj Wydarzenie", adminOnly: true},
    {template: "exporter", label: "Import/Export Danych", adminOnly: true}
];

Template.navigation.allPages = allPages;
Template.navigation.helpers({
    pageLinks: function() {
        if (checkPrivilege(Meteor.user(), 'master')) {
            return allPages;
        }
        if (checkPrivilege(Meteor.user(), 'user')) {
            return allPages.filter(page => !page.adminOnly)
        }
        return [];
    }
});

Template.pageLink.helpers({
    classes: function() {
        return '';
    }
});

Template.pageLink.events({
    'click a': function(event) {
        event.preventDefault();
        Template.body.mainLayout.root.contentItems[0].addChild({
            type: 'component',
            componentName: this.template,
            componentState: {}
        });
    }
});

Template.pageLink.onRendered(function() {
    var element = this.find('.draggable');
    var config = {
        type: 'component',
        componentName: Template.currentData().template,
        componentState: {}
    };
    Template.body.mainLayout.createDragSource(element, config);
});
