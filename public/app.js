(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./components/createstand":2,"./components/highscorelist":3,"./components/highscores":4,"./components/inventorysummary":5,"./components/manageinventory":6,"./components/standsummary":7,"./components/weathersummary":8,"./controllers/highscores":9,"./controllers/inventorysummary":10,"./controllers/manageinventory":11,"./controllers/newstand":12,"./services/lemonaidservice":13}],2:[function(require,module,exports){
module.exports = {
    name: 'createStand',
    object: {
        controller: 'NewStandController',
        templateUrl: 'templates/stand.html',
    },
};

},{}],3:[function(require,module,exports){
module.exports = {
    name: 'highscoreList',
    object: {
        templateUrl: 'templates/scores.html',
        bindings: {
            score: '<',
        }
    },
}

},{}],4:[function(require,module,exports){
module.exports = {
    name: 'highscores',
    object: {
        controller: 'HighScoresController',
        controllerAs: '$ctrl',
        templateUrl: 'templates/highscores.html',
    },
}

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
module.exports = {
    name: 'manageInventory',
    object: {
        controller: 'ManageInventoryController',
        templateUrl: 'templates/manage.html',
    },
};

},{}],7:[function(require,module,exports){
module.exports = {
    name: 'standSummary', // <stand-summary> in view
    object: {
        templateUrl: 'templates/standsummary.html',

        // these are use to pass data from manage.html (manageinventory.js) into the stand-summary component
        bindings: {
            info: '<', // < is read only binding, otherwise known as one-way binding
        }
    },
};

},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports = {

    name: 'HighScoresController', 
    func: function($scope, LemonaidService) {
        console.log('I am highscore controller');
        LemonaidService.getHighScores()
            .then(function(response) {
                $scope.scores = response.data;
            });
    }
    
};
},{}],10:[function(require,module,exports){
module.exports = {
    name: 'InventorySummaryController',
    func: function ($scope, $state, LemonaidService) {
            $scope.buy = function(ingredientLabel, quantity) {
                const currentStand = (LemonaidService.getCurrentStand().stand_id);
                LemonaidService.buyIngredient(ingredientLabel, quantity, currentStand)
                    .then(function(response) {
                        $state.reload();
                    });
            }
    },
};
},{}],11:[function(require,module,exports){
module.exports = {
    name: 'ManageInventoryController',
    func: function ($scope, $state, LemonaidService) {
        const currentStand = LemonaidService.getCurrentStand();
        //console.log('this is my currentstand' + currentStand);

        if (currentStand === undefined) {
            $state.go('create-stand');
        } else {
            LemonaidService.getStand(currentStand.stand_id)
                .then(function (response) {
                    let stand = response.data;

                    stand.name = currentStand.stand_name;

                    stand.ingredients.forEach(function(ingredient){
                        if(ingredient.label === 'ice') {
                            ingredient.price = '$0.50';
                        }
                        if(ingredient.label === 'lemons') {
                            ingredient.price = '$2.00';
                        }
                        if(ingredient.label === 'ice') {
                            ingredient.price = '$1.25';
                        }
                        if(ingredient.label === 'ice') {
                            ingredient.price = '$0.10';
                        }
                    })

                    $scope.stand = stand;
                    $scope.stats = [{
                        title: 'Day',
                        value: stand.day,
                    },{
                        title: 'Balance',
                        value: stand.business.balance,
                    },{
                        title: 'Visitors',
                        value: stand.business.yesterday_visitors,
                    },{
                        title: 'Customers',
                        value: stand.business.yesterday_cups_sold,
                    }];
                });

                LemonaidService.getWeather()
                    .then(function(response){
                        let result = response.data
                        $scope.weather = [{
                            temperature: result.temperature,
                            condition: result.condition,
                         }];
                    });
        }
    }
}
},{}],12:[function(require,module,exports){
module.exports = {
    name: 'NewStandController',
    func: function ($scope, LemonaidService) {
        $scope.standName = '';
        //$scope.stands is made up and I am setting it to LemonaidService.getLemonaidStands();
        //Because I added $scope. I will be able to share its value b/t controller and the view
        //$scope.stands = LemonaidService.getLemonaidStands();

        $scope.add = function () {
            //console.log('I added a stand');
            LemonaidService.addStand($scope.standName);
            //console.log(LemonaidService.getLemonaidStands());
        }
    },
};
},{}],13:[function(require,module,exports){
module.exports = {
    name: 'LemonaidService',
    func: function($http, $state) {
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

                    //console.log('AFTER', allLemonaidStands);

                }).catch(function(error) {
                    // will run if error in POST
                });
            },
            buyIngredient(ingredientLabel, quantity, standId) {
                return $http.post('https://blooming-hamlet-70507.herokuapp.com/stand/update?id=' + standId, {
                    property: "ingredients." + ingredientLabel,
                    add: quantity,
                });
            },
            getStand(standId) {
                return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + standId);
            },
            getLemonaidStands() {
                return allLemonaidStands;
            },

            getCurrentStand() {
                return allLemonaidStands[allLemonaidStands.length - 1];
            },

            getHighScores() {
                return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top')
            },

            getWeather() {
                return $http.get('https://blooming-hamlet-70507.herokuapp.com/weather/forecast')
            },
        };
    }
}
},{}]},{},[1]);
