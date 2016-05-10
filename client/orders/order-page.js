Template.orderPage.helpers({
    currentOrder: function() {
        var orderId = Session.get('pageData');
        return CustomOrders.findOne({_id: orderId},{});
    }
});
