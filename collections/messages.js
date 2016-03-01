Messages = new Mongo.Collection("messages");
Messages.schema = new SimpleSchema({
    content: {type: String},
    createdAt: {type: Date},
    sender: {type: String, regEx: SimpleSchema.RegEx.Id},
    senderName: {type: String},
    recipent: {type: String, regEx: SimpleSchema.RegEx.Id},
    recipentName: {type: String}
});
Messages.attachSchema(Messages.schema);
