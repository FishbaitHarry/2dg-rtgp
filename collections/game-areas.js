GameAreas = new Mongo.Collection("game-areas");
GameAreas.connectionSchema = new SimpleSchema({
    to: {type: String, regEx: SimpleSchema.RegEx.Id},
    toName: {type: String},
    transport: {type: String, allowedValues: ['land', 'water', 'air']},
    distance: {type: Number, defaultValue: 1}
});
GameAreas.schema = new SimpleSchema({
    name: {type: String},
    description: {type: String},
    areaType: {type: String, allowedValues: ['normal', 'rough', 'water']},
    owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    ownerName: {type: String, autoValue: onOwnerName},
    factionName: {type: String, autoValue: onFactionName},
    connections: {type: [GameAreas.connectionSchema], optional: true}
});
GameAreas.attachSchema(GameAreas.schema);

function onOwnerName() {
    var owner = this.field('owner');
    if (owner.isSet) {
        var user = Meteor.users.findOne({_id:owner.value});
        return user.username;
    } else {
        return 'N/A';
    }
}

function onFactionName() {
    var owner = this.field('owner');
    if (owner.isSet && !this.isSet) {
        var user = Meteor.users.findOne({_id:owner.value});
        return user.profile.factionName;
    } else {
        return;
    }
}
