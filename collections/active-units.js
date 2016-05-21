ActiveUnits = new Mongo.Collection("active-units");
ActiveUnits.statsSchema = new SimpleSchema({
    white: {type: Number},
    green: {type: Number},
    red: {type: Number},
    black: {type: Number},
    blue: {type: Number}
});
ActiveUnits.propsSchema = new SimpleSchema({
    cavalry: {type: Boolean, optional: true},
    infantry: {type: Boolean, optional: true},
    ranged: {type: Boolean, optional: true},
    flying: {type: Boolean, optional: true},
    flamebreathing: {type: Boolean, optional: true},
    monster: {type: Boolean, optional: true},
    slayer: {type: Boolean, optional: true},
    necro: {type: Boolean, optional: true},
    machine: {type: Boolean, optional: true},
    demon: {type: Boolean, optional: true},
    sealer: {type: Boolean, optional: true},
});
ActiveUnits.schema = new SimpleSchema({
    name: {type: String},
    description: {type: String},
    stats: {type: ActiveUnits.statsSchema},
    props: {type: ActiveUnits.propsSchema},
    owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    ownerName: {type: String, autoValue: onOwnerName},
    factionName: {type: String, autoValue: onFactionName},
    location: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    locationName: {type: String, autoValue: onLocationName},
});
ActiveUnits.attachSchema(ActiveUnits.schema);

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

function onLocationName() {
    var location = this.field('location');
    if (location.isSet) {
        var area = GameAreas.findOne({_id:location.value});
        return area.name;
    } else {
        return 'N/A';
    }
}
