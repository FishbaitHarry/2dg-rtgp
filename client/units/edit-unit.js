Template.editUnit.helpers({
    activeUnit: function() {
        var unitId = Session.get('pageData');
        return ActiveUnits.findOne(unitId);
    }
});

Template.editUnit.events({
    'click .delete': function() {
        var unitId = Session.get('pageData');
        Session.set({page: 'myUnits'});
        ActiveUnits.remove(unitId);
    }
});
