Template.exporter.events({
    'click .btn-download': function(event) {
        event.preventDefault();
        var data = JSON.stringify(getAllData());
        var blob = new Blob([data], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        window.open(url, '_blank');
    },
    'dragover .dropzone': function (event) {
        event.stopPropagation();
        event.preventDefault();
        event.originalEvent.dataTransfer.dropEffect = 'copy';
    },
    'drop .dropzone': function (event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.originalEvent.dataTransfer.files[0];
        var reader = new FileReader();
        reader.onload = importData;
        reader.readAsText(file);
    },
    'change input[type=file]': function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = importData;
        reader.readAsText(file);
    }
});

function getAllData() {
    var collections = {
        // customOrders: CustomOrders,
        // messages: Messages,
        areaConnections: AreaConnections,
        users: Meteor.users,
        activeUnits: ActiveUnits,
        gameAreas: GameAreas
    };
    Object.keys(collections).forEach(function(coll) {
        collections[coll] = dumpCollection(collections[coll]);
    });
    return collections;
}

function dumpCollection(collection) {
    var allModels = collection.find();
    return allModels.fetch();
}

function importData(loadEvent) {
    var jsonFileData = JSON.parse(loadEvent.target.result);
    console.log(jsonFileData);
    importCollection(ActiveUnits, jsonFileData.activeUnits);
    importCollection(GameAreas, jsonFileData.gameAreas);
    importCollection(AreaConnections, jsonFileData.areaConnections);
    importCollection(Meteor.users, jsonFileData.users);
}

function importCollection(collection, modelsArray) {
    if (!modelsArray) return;
    var modelsWithId = modelsArray.filter(model => model._id);
    var modelsNew = modelsArray.filter(model => !model._id);
    modelsWithId.forEach(function (model) {
        var modelExists = collection.findOne(model._id);
        if (modelExists) {
            collection.update(model._id, {$set: model});
        } else {
            modelsNew.push(model);
        }
    });
    modelsNew.forEach(function (model) {
        collection.insert(model);
    });
}
