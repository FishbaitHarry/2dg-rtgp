Template.orderSummary.helpers({
    senderName: function() {
        if (Meteor.userId() === this.sender) {
            return '';
        }
        return this.senderName;
    },
    contentShort: function() {
        return this.content.slice(0,16).concat('...');
    },
    createdAt: function() {
        return this.createdAt.toISOString().slice(0,10);
    }
});

Template.orderSummary.events({
    "click a": function(evt) {
        evt.preventDefault();
        Session.set({
            page: 'orderPage',
            pageData: this._id
        });
    }
});
