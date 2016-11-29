Template.editUnit.helpers({
    activeUnit: function() {
        return ActiveUnits.findOne(this.pageUnitId);
    }
});

Template.editUnit.events({
    'click .delete': function(evt, template) {
        template.data.layoutContainer.close();
        ActiveUnits.remove(this.pageUnitId);
    }
});
