Template.unitSummary.helpers({
    propsSummary: function() {
        return Object.keys(this.props)
        .filter(propName => this.props[propName])
        .join(', ');
    }
})

Template.unitSummary.events({
    'click .edit': function(evt) {
        evt.preventDefault();
        Template.body.addChild({
            type: 'component',
            componentName: 'editUnit',
            componentState: {pageUnitId: this._id}
        });
    }
});
