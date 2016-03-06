Template.registerHelper('orderStatusIcon', function(status) {
    if (status == 'unread') return 'glyphicon glyphicon-eye-close';
    if (status == 'read') return 'glyphicon glyphicon-eye-open';
    if (status == 'inprogress') return 'glyphicon glyphicon-fire';
    if (status == 'executed') return 'glyphicon glyphicon-check';
});

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
    contentShort: function() {
        return this.content.slice(0,16).concat('...');
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
    'click button.save': function() {
        var setOptions = {modifiedAt: new Date()};
        var content = Template.instance().$('.order-content').text();
        var reply = Template.instance().$('.order-reply').text();
        var status = Template.instance().$('select[name=status]').val();
        if (content) setOptions.content = content;
        if (reply) setOptions.reply = reply;
        if (status) setOptions.status = status;
        CustomOrders.update(this._id, {$set: setOptions});
    }
})

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
