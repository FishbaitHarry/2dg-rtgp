Template.registerHelper('orderStatusIcon', function(status) {
    if (status == 'unread') return 'glyphicon glyphicon-eye-close';
    if (status == 'read') return 'glyphicon glyphicon-eye-open';
    if (status == 'inprogress') return 'glyphicon glyphicon-fire';
    if (status == 'executed') return 'glyphicon glyphicon-check';
});
