PublicEvents = new Mongo.Collection("public-events");
PublicEvents.schema = new SimpleSchema({
    title: {type: String},
    content: {type: String},
    createdAt: {type: Date, autoValue: setCreatedAt},
    turnNumber: {type: Number},
    freezeGame: {type: Boolean} //does not allow new orders
});
PublicEvents.attachSchema(PublicEvents.schema);

function setCreatedAt() {
    if (this.isInsert) {
        return new Date();
    } else {
        this.unset();
    }
}

PublicEvents.getCurrentTurn = function() {
    var lastEvent = PublicEvents.findOne({}, {sort: {createdAt: -1}});
    if (!lastEvent) return 1;
    return lastEvent.turnNumber;
}
