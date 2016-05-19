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
}

function importCollection(collection, modelsArray) {
    if (!modelsArray) return;
    // TODO: j-j-j-just jam it in!
}
