Template.myUnits.helpers({
    units: function() {
        return ActiveUnits.find({owner: Meteor.userId()});
    }
});
