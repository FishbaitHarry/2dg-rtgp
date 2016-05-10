Template.messagesListItem.events({
    "click .delete": function () {
        Messages.remove(this._id);
    }
});
