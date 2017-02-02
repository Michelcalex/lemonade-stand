(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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



const components = [
    require('./components/createstand'),
    require('./components/highscores'),
    require('./components/manageinventory'),
];

for (let i = 0; i < components.length; i++) {
    app.component(components[i].name, components[i].object);
}


const services = [
    require('./services/lemonaidservice'),
];

for (let i = 0; i < services.length; i++) {
    app.service(services[i].name, services[i].func);
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


// app.component('createStand', {
//     controller: 'NewStandController',
//     templateUrl: 'templates/stand.html',
// });

// app.component('manageInventory', {
//     controller: 'ManageInventoryController',
//     templateUrl: 'templates/manage.html',
// });

// app.component('highscores', {
//     controller: 'HighScoresController',
//     templateUrl: 'templates/highscores.html',
// });



// app.factory('LemonaidService', function($http, $state) {
//     const allLemonaidStands =[];

//     return {
//         addStand(standName) {
//             $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
//                 stand_name: standName,
//             }).then(function(response) {
//                 // will run if success in POST
//                 allLemonaidStands.push({ 
//                     stand_name: standName,
//                     stand_id: response.data.stand_id 
//                 });
//                 $state.go('manage-inventory');

//             // console.log('AFTER', allLemonaidStands);

//             }).catch(function(error) {
//                 // will run if error in POST
//             });
//         },
//         getStand(standId) {
//              return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + standId);
//         },
//         getLemonaidStands() {
//             return allLemonaidStands;
//         },
//     };

// });
},{"./components/createstand":2,"./components/highscores":3,"./components/manageinventory":4,"./controllers/highscores":5,"./controllers/manageinventory":6,"./controllers/newstand":7,"./services/lemonaidservice":8}],2:[function(require,module,exports){
module.exports = {
    name: 'createStand',
    object: {
        controller: 'NewStandController',
        templateUrl: 'templates/stand.html',
    },
};




// app.component('createStand', {
//     controller: 'NewStandController',
//     templateUrl: 'templates/stand.html',
// });
},{}],3:[function(require,module,exports){
module.exports = {
    name: 'highscores',
    object: {
        controller: 'HighScoresController',
        templateUrl: 'templates/highscores.html',
    },
}


// app.component('highscores', {
//     controller: 'HighScoresController',
//     templateUrl: 'templates/highscores.html',
// });

},{}],4:[function(require,module,exports){
module.exports = {
    name: 'manageInventory',
    object: {
        controller: 'ManageInventoryController',
        templateUrl: 'templates/manage.html',
    },
};


// app.component('manageInventory', {
//     controller: 'ManageInventoryController',
//     templateUrl: 'templates/manage.html',
// });
},{}],5:[function(require,module,exports){
module.exports = {

    name: 'HighScoresController', 
    func: function() {
        console.log('I am highscore controller');
    }
    
};
},{}],6:[function(require,module,exports){
module.exports = {
    name: 'ManageInventoryController',
    func: function($scope, $stateParams, LemonaidService) {
        $scope.allStands = [];
        const tempStands = LemonaidService.getLemonaidStands();
        
        for (let i = 0; i < tempStands.length; i++) {
            LemonaidService.getStand(tempStands[i].stand_id)
                .then(function(response) {
                    let stand = response.data;
                    stand.name = tempStands[i].stand_name;

                    $scope.allStands.push(stand);
                });
        }
    }
}
},{}],7:[function(require,module,exports){
module.exports = {
    name: 'NewStandController',
    func: function ($scope, LemonaidService) {
        $scope.standName = '';
        $scope.stands = LemonaidService.getLemonaidStands();

        $scope.add = function () {
            console.log('I added a stand');
            LemonaidService.addStand($scope.standName);
            console.log(LemonaidService.getLemonaidStands());
        }
        },
};
},{}],8:[function(require,module,exports){
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
    }
}
},{}]},{},[1]);
