CustomOrders = new Mongo.Collection("custom-orders");
CustomOrders.schema = new SimpleSchema({
    content: {type: String, autoValue: sanitizeOrderContent},
    status: {type: String, allowedValues: ['unread', 'read', 'inprogress', 'executed']},
    reply: {type: String, autoValue: sanitizeOrderContent, optional: true},
    createdAt: {type: Date, autoValue: setCreatedAt},
    modifiedAt: {type: Date, autoValue: setModifiedAt},
    createdAtTurn: {type: Number, autoValue: setCurrentTurn},
    remindAtTurn: {type: Number, optional: true},
    sender: {type: String, regEx: SimpleSchema.RegEx.Id},
    senderName: {type: String}
});
CustomOrders.attachSchema(CustomOrders.schema);

function sanitizeOrderContent() {
    return sanitizeHtml(this.value);
}
function setCreatedAt() {
    if (this.isInsert) {
        return new Date();
    } else {
        this.unset();
    }
}
function setModifiedAt() {
    return new Date();
}

function setCurrentTurn() {
    if (this.isInsert) {
        return PublicEvents.getCurrentTurn();
    } else {
        this.unset();
    }
}
