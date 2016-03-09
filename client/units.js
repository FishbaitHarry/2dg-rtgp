Template.allUnits.helpers({
    units: function() {
        return ActiveUnits.find({});
    }
});

Template.myUnits.helpers({
    units: function() {
        return ActiveUnits.find({owner: Meteor.userId()});
    }
});

Template.unitSummary.events({
    'click .edit': function(evt) {
        evt.preventDefault();
        Session.set({
            page: 'editUnit',
            pageData: this._id
        })
    }
});

Template.editUnit.helpers({
    activeUnit: function() {
        var unitId = Session.get('pageData');
        return ActiveUnits.findOne(unitId);
    }
})
