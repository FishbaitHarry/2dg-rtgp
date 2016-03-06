Template.collapsible.helpers({
    showCollapsible: function() {
        return Template.instance().showCollapsible.get();
    }
});

Template.collapsible.events({
    'click .show-collapsible': function() {
        Template.instance().showCollapsible.set(true);
    },
    'click .hide-collapsible': function() {
        Template.instance().showCollapsible.set(false);
    }
});

Template.collapsible.onCreated(function () {
  // set up local reactive variables
  this.showCollapsible = new ReactiveVar(false);
});
