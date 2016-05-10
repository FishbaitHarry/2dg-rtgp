Template.newOrderForm.events({
    "submit form": function (event) {
        event.preventDefault();
        var text = Template.instance().$('.order-content').text();

        CustomOrders.insert({
            content: text,
            status: 'unread',
            createdAtTurn: 1,
            userEditable: true,
            sender: Meteor.userId(),
            senderName: Meteor.user().username
        });
    }
});
