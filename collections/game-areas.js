GameAreas = new Mongo.Collection("game-areas");
GameAreas.connectionSchema = new SimpleSchema({
    to: {type: String, regEx: CustomSchemas.LooseId},
    toName: {type: String},
    transport: {type: String, allowedValues: ['land', 'water', 'air']},
    distance: {type: Number, defaultValue: 1}
});
GameAreas.schema = new SimpleSchema({
    name: {type: String},
    description: {type: String},
    x: {type: Number, decimal: true},
    y: {type: Number, decimal: true},
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
    if (!owner.isSet) {
        return 'Neutral';
    }
    if (owner.isSet && !this.isSet) {
        var user = Meteor.users.findOne({_id:owner.value});
        return user.profile.factionName;
    } else {
        return;
    }
}

if (Meteor.isServer) {
    Meteor.publish('gameAreas', function() {
        return GameAreas.find();
    });
} else {
    Meteor.subscribe('gameAreas');
}
