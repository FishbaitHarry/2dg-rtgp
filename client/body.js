import GoldenLayout from 'golden-layout';

var defaultLayoutConfig = {
    content: [{
        type: 'stack',
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
            componentState: { mobile: 'false111' }
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
                var componentRootEl = container.getElement()[0];
                var data = Object.assign({layoutContainer: container}, componentState);
                Blaze.renderWithData(templateClass, data, componentRootEl);
            });
        }
    });
}

Template.body.addChild = function(layoutConfig) {
    Template.body.mainLayout.root.contentItems[0].addChild(layoutConfig);
};
