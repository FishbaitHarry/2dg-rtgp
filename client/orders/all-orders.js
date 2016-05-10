Template.allOrders.helpers({
    orders: function() {
        return CustomOrders.find({}, {
            sort: {createdAt: -1},
            limit: 100
        });
    }
});
