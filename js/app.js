const app = angular.module('LemonaidStandApp', ['ui.router']);


//Controllers --------------------------------
const controllers = [
    require('./controllers/newstand'),
    require('./controllers/highscores'),
    require('./controllers/manageinventory'),
    require('./controllers/inventorysummary'),
];

for (let i = 0; i < controllers.length; i++) {
    app.controller(controllers[i].name, controllers[i].func);
}


//Components --------------------------------
const components = [
    require('./components/createstand'),
    require('./components/highscores'),
    require('./components/manageinventory'),
    require('./components/standsummary'),
    require('./components/inventorysummary'),
    require('./components/highscorelist'),
    require('./components/weathersummary'),
];

for (let i = 0; i < components.length; i++) {
    app.component(components[i].name, components[i].object);
}


//Services --------------------------------
const services = [
    require('./services/lemonaidservice'),
];

for (let i = 0; i < services.length; i++) {
    app.service(services[i].name, services[i].func);
}


//States --------------------------------
app.config(function ($stateProvider) {
    // $stateProvider is the object we add routes ('states') to.
    $stateProvider.state({
        name: 'create-stand',
        url: '/stand',
        component: 'createStand',
    });

    $stateProvider.state({
        name: 'manage-inventory',
        url:'/manage',
        component: 'manageInventory',
    });

    $stateProvider.state({
        name: 'user-highscores',
        url:'/highscores',
        component: 'highscores',
    });

    $stateProvider.state({
        name: 'home',
        url: '',
        component: 'createStand',
    });
});

app.filter('titleCase', function() {
    return function(input) {
        input = input || '';
        return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
    };
});