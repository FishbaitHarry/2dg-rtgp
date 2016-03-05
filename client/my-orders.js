Template.myOrders.helpers({
    orders: function() {
        return CustomOrders.find({
            sender: Meteor.userId()
        }, {
            sort: {createdAt: -1},
            limit: 100
        });
    }
});

Template.myOrders.events({
    "click .new-order-link": function(evt) {
        Session.set({
            page: 'newOrder'
        });
    }
})

Template.orderSummary.helpers({
    senderName: function() {
        if (Meteor.userId() === this.sender) {
            return '';
        }
        return this.senderName;
    },
    icon: function() {
        if (this.status == 'unread') return 'glyphicon glyphicon-eye-close';
        if (this.status == 'read') return 'glyphicon glyphicon-eye-open';
        if (this.status == 'inprogress') return 'glyphicon glyphicon-fire';
        if (this.status == 'executed') return 'glyphicon glyphicon-check';
    },
    contentShort: function() {
        return this.content.slice(0,12).concat('...');
    },
    createdAt: function() {
        return this.createdAt.toISOString().slice(0,10);
    }
});


Template.orderSummary.events({
    "click a": function(evt) {
        Session.set({
            page: 'orderPage',
            pageData: this._id
        });
    }
})


Template.orderPage.helpers({
    currentOrder: function() {
        var orderId = Session.get('pageData');
        return CustomOrders.findOne({_id: orderId},{});
    }
});

Template.newOrder.events({
    "submit form": function (event) {
        event.preventDefault();
        var text = Template.instance().$('.order-content').text();

        CustomOrders.insert({
            content: text,
            status: 'unread',
            createdAt: new Date(),
            modifiedAt: new Date(),
            createdAtTurn: 1,
            userEditable: true,
            sender: Meteor.userId(),
            senderName: Meteor.user().username
        });
    }
});
