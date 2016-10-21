Template.allUnits.helpers({
    units: function() {
        return ActiveUnits.find({}, {sort: {factionName: 1, name: 1}});
    }
});
