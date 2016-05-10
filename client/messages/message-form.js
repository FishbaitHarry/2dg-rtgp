Template.messageForm.helpers({
    users: function() {
        return Meteor.users.find({}, {
            fields: {'_id':1, 'username':1}
        });
    }
});

Template.messageForm.events({
    "submit form": function (event) {
        event.preventDefault();
        var form = event.target;
        form

        Messages.insert({
            content: form.text.value,
            createdAt: new Date(),
            sender: Meteor.userId(),
            senderName: Meteor.user().username,
            recipent: form.recipent.value,
            recipentName: form.recipent.selectedOptions[0].label
        });

        event.target.text.value = "";
    }
});
