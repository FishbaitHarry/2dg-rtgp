Template.newOrderForm.events({
    "submit form": function (event, template) {
        event.preventDefault();
        var text = Template.instance().$('.order-content').html();

        CustomOrders.insert({
            content: text,
            status: 'unread',
            createdAtTurn: 1,
            userEditable: true,
            sender: Meteor.userId(),
            senderName: Meteor.user().username
        });
        template.data.layoutContainer.close();
    }
});
