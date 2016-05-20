Template.unitSummary.events({
    'click .edit': function(evt) {
        evt.preventDefault();
        Session.set({
            page: 'editUnit',
            pageData: this._id
        })
    }
});
