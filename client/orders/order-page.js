Template.orderPage.helpers({
    currentOrder: function() {
        return CustomOrders.findOne({_id: this.pageOrderId},{});
    }
});
