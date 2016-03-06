Template.listAreas.helpers({
    areas: function() {
        return GameAreas.find({});
    }
});

Template.areaSummary.helpers({
    showMore: function() {
        return Template.instance().showMore;
    }
});

Template.areaSummary.events({
    'click .edit': function() {
        Session.set({
            page: 'editArea',
            pageData: this._id
        });
    },
    'click .more': function() {
        Template.instance().showMore = true;
    }
});

Template.editArea.helpers({
    area: function() {
        var areaId = Session.get('pageData');
        return GameAreas.findOne(areaId);
    }
});
