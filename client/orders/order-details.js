Template.orderDetails.helpers({
    userEditable: function() {
        var currentTurn = PublicEvents.getCurrentTurn();
        return this.createdAtTurn === currentTurn;
    },
    canReply: function() {
        return checkPrivilege(Meteor.user(), 'master');
    },
    reply: function() {
        return this.reply || 'N/A';
    }
});

Template.orderDetails.events({
    'input [contenteditable],select': function() {
        Template.instance().$('button').prop('disabled', false);
    },
    'click [data-action=save]': function(evt, template) {
        var setOptions = {};
        var content = template.$('.order-content').html();
        var reply = template.$('.order-reply').html();
        var status = template.$('select[name=status]').val();
        if (content) setOptions.content = content;
        if (reply) setOptions.reply = reply;
        if (status) setOptions.status = status;
        CustomOrders.update(this._id, {$set: setOptions});
    },
    'click [data-action=delete]': function(evt, template) {
        // template.data.layoutContainer.close();
        CustomOrders.remove(this._id);
    }
});
