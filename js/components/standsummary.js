module.exports = {
    name: 'standSummary', // <stand-summary> in view
    object: {
        templateUrl: 'templates/standsummary.html',

        // these are use to pass data from manage.html (manageinventory.js) into the stand-summary component
        bindings: {
            title: '<', // < is read only binding, otherwise known as one-way binding
            value: '<',
        }
    },
};
