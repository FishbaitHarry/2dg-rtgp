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
        evt.preventDefault();
        Session.set({
            page: 'newOrderForm'
        });
    }
});
