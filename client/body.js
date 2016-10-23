import GoldenLayout from 'golden-layout';

var defaultLayoutConfig = {
    content: [{
        type: 'row',
        content:[{
            type: 'component',
            width: 30,
            isClosable: false,
            componentName: 'navigation',
            componentState: { templateName: 'navigation' }
        },{
            type: 'component',
            width: 70,
            componentName: 'recentEvents',
            componentState: { templateName: 'recentEvents' }
        }]
    }]
};

Template.body.helpers({});

Template.body.mainLayout = {};
Template.body.onRendered(function() {
    var config = defaultLayoutConfig;
    Template.body.mainLayout = new GoldenLayout( config );
    registerAllPages(Template.body.mainLayout);
    Template.body.mainLayout.init();
});

function registerAllPages(gLayout) {
    Object.getOwnPropertyNames(Template)
    .forEach(function(property) {
        var templateName = property;
        var templateClass = Template[property];
        if(Blaze.isTemplate(templateClass)) {
            gLayout.registerComponent(templateName, function(container, componentState){
                Blaze.render(templateClass, container.getElement()[0]);
            });
        }
    });
}
