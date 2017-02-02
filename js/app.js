const app = angular.module('LemonaidStandApp', ['ui.router']);


// TODO: seperate - for Luke
const controllers = [
    require('./controllers/newstand'),
    require('./controllers/highscores'),
    require('./controllers/manageinventory'),
];

for (let i = 0; i < controllers.length; i++) {
    app.controller(controllers[i].name, controllers[i].func);
}


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
});


app.component('createStand', {
    controller: 'NewStandController',
    templateUrl: 'templates/stand.html',
});

app.component('manageInventory', {
    controller: 'ManageInventoryController',
    templateUrl: 'templates/manage.html',
});

app.component('highscores', {
    controller: 'HighScoresController',
    templateUrl: 'templates/highscores.html',
});



app.factory('LemonaidService', function($http, $state) {
    const allLemonaidStands =[];

    return {
        addStand(standName) {
            $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
                stand_name: standName,
            }).then(function(response) {
                // will run if success in POST
                allLemonaidStands.push({ 
                    stand_name: standName,
                    stand_id: response.data.stand_id 
                });
                $state.go('manage-inventory');

            // console.log('AFTER', allLemonaidStands);

            }).catch(function(error) {
                // will run if error in POST
            });
        },
        getStand(standId) {
             return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + standId);
        },
        getLemonaidStands() {
            return allLemonaidStands;
        },
    };

});