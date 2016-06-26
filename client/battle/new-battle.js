
Template.newBattle.onCreated(function () {
  // set up local reactive variables
  this.battleLog = new ReactiveVar(false);
});

Template.newBattle.helpers({
    allUnits: function() {
        return ActiveUnits.find({});
    },
    battleLog: function() {
        return Template.instance().battleLog.get();
    }
});

Template.newBattle.events({
    'submit form': function(evt) {
        evt.preventDefault();
        var unitA = ActiveUnits.findOne(evt.target.unitA.value);
        var unitB = ActiveUnits.findOne(evt.target.unitB.value);
        var normalA = toNormalUnit(unitA);
        var normalB = toNormalUnit(unitB);
        Battle.unitClash(normalA, normalB);
        Template.instance().battleLog.set(Battle.getLogs());
    }
});

function toNormalUnit(unit) {
  return _.extend({}, unit.stats, unit.props, {name: unit.name});
}
