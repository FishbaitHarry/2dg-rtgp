ActiveUnits = new Mongo.Collection("active-units");
ActiveUnits.statsSchema = new SimpleSchema({
    white: {type: Number},
    green: {type: Number},
    red: {type: Number},
    black: {type: Number},
    blue: {type: Number}
});
ActiveUnits.schema = new SimpleSchema({
    name: {type: String},
    description: {type: String},
    stats: {type: ActiveUnits.statsSchema, optional: true},
    owner: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    ownerName: {type: String, autoValue: onOwnerName},
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

function onLocationName() {
    var location = this.field('location');
    if (location.isSet) {
        var area = GameAreas.findOne({_id:location.value});
        return area.name;
    } else {
        return 'N/A';
    }
}
