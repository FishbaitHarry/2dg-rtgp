Template.registerHelper('gameAreaSelect', function(status) {
    var users = GameAreas.find({}, {
        fields: {'_id':1, 'name':1}
    });
    return users.map((area) => ({label: area.name, value: area._id}));
});

Template.listAreas.helpers({
    areas: function() {
        return GameAreas.find({}, {sort: {name: 1}});
    }
});

Template.areaSummary.helpers({
    showMore: function() {
        return Template.instance().showMore;
    }
});

Template.areaSummary.events({
    'click .edit': function() {
        Template.body.addChild({
            type: 'component',
            componentName: 'editArea',
            componentState: {pageAreaId: this._id}
        });
    },
    'click .remove': function() {
        GameAreas.remove(this._id);
    },
    'click .more': function() {
        Template.instance().showMore = true;
    }
});

Template.editArea.helpers({
    area: function() {
        return GameAreas.findOne(this.pageAreaId);
    }
});
