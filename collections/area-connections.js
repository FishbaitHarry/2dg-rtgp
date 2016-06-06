AreaConnections = new Mongo.Collection("area-connections");
AreaConnections.schema = new SimpleSchema({
    firstRegionId: {type: String, regEx: CustomSchemas.LooseId},
    secondRegionId: {type: String, regEx: CustomSchemas.LooseId},
    transport: {type: String, allowedValues: ['land', 'water', 'air']},
    distance: {type: Number, defaultValue: 1}
});
AreaConnections.attachSchema(AreaConnections.schema);
