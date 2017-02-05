module.exports = {
    name: 'weatherSummary', // <stand-summary> in view
    object: {
        templateUrl: 'templates/weathersummary.html',

        // these are use to pass data from manage.html (manageinventory.js) into the stand-summary component
        bindings: {
            condition: '<', // < is read only binding, otherwise known as one-way binding
        }
    },
};