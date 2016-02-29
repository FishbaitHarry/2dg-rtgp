Messages = new Mongo.Collection("messages");

Template.messages.helpers({
    messages: function () {
        // return [{content: 'ala'},{content: 'ma'},{content: 'kota'}];
        return Messages.find({});
        return Messages.find({}, {
            sort: {createdAt: 1},
            limit: 100
        });
    }
});

Template.messages.events({
    "submit .new-task": function (event) {
        event.preventDefault();
        var text = event.target.text.value;

        Messages.insert({
            content: text,
            createdAt: new Date()
        });

        event.target.text.value = "";
    }
});

Template.message.events({
    "click .toggle-checked": function () {
        // Set the checked property to the opposite of its current value
        Messages.update(this._id, {
            $set: {
                checked: !this.checked
            }
        });
    },
    "click .delete": function () {
        Messages.remove(this._id);
    }
});
