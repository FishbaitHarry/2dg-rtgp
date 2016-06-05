Template.orderDetails.helpers({
    contentAttrs: function() {
        return this.userEditable ? {contenteditable: ''} : {};
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
    'click [data-action=save]': function() {
        var setOptions = {};
        var content = Template.instance().$('.order-content').html();
        var reply = Template.instance().$('.order-reply').html();
        var status = Template.instance().$('select[name=status]').val();
        if (content) setOptions.content = content;
        if (reply) setOptions.reply = reply;
        if (status) setOptions.status = status;
        CustomOrders.update(this._id, {$set: setOptions});
        Session.set({page: 'myOrders'});
    },
    'click [data-action=delete]': function() {
        CustomOrders.remove(this._id);
        Session.set({page: 'allOrders'});
    }
});
