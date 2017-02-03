module.exports = {
    name: 'inventorySummary', // <inventory-summary> in view
    object: {
        controller: 'InventorySummaryController',
        controllerAs: '$ctrl',
        templateUrl: 'templates/inventorysummary.html',

        // these are use to pass data from manage.html (manageinventory.js) into the stand-summary component
        bindings: {
            ingredient: '<', // < is read only binding, otherwise known as one-way binding
        }
    },
};
