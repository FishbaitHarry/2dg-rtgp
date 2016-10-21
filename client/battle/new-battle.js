
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
        var sideA = [], sideB = [];
        Template.instance()
          .$('[name=sideA] input:checked')
          .each((i,el) => sideA.push(el.value));
        Template.instance()
          .$('[name=sideB] input:checked')
          .each((i,el) => sideB.push(el.value));

        Battle.resolveBattle(
          sideA.map(getUnitById),
          sideB.map(getUnitById)
        );

        Template.instance().battleLog.set(Battle.getLogs());
    }
});

function getUnitById(id) {
  return toNormalUnit(ActiveUnits.findOne(id));
}

function toNormalUnit(unit) {
  return _.extend({}, unit.stats, unit.props, {name: unit.name});
}
