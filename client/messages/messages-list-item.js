Template.messagesListItem.events({
    "click data-action=delete": function (evt) {
        evt.preventDefault();
        Messages.remove(this._id);
    }
});
