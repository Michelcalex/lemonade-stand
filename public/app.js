(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('LemonaidStandApp', ['ui.router']);


// TODO: seperate - for Luke
// const controllers = [
//     require('./controllers/newstandcontroller'),
// ];

// for (let i = 0; i < controllers.length; i++) {
//     app.controller(controllers[i].name, controllers[i].func);
// }


app.config(function ($stateProvider) {
    // $stateProvider is the object we add routes ('states') to.
    $stateProvider.state({
        name: 'create-stand',
        url: '/stand',
        component: 'createStand',
    });
});



app.controller('NewStandController', function($scope, LemonaidService) {

    $scope.standName = '';
    $scope.stands = LemonaidService.getLemonaidStands();

    $scope.add = function() {
        console.log('I added a stand');
        LemonaidService.addStand($scope.standName);
        console.log(LemonaidService.getLemonaidStands());
    }
});




app.component('createStand', {
    controller: 'NewStandController',
    templateUrl: 'templates/stand.html',
});




app.factory('LemonaidService', function($http) {
    const allLemonaidStands =[];

    return {
        addStand(stand) {
            allLemonaidStands.push(stand);

            $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
                stand_name: stand.standName,
            }).then(function(response) {
                debugger;
            });
        },
        getLemonaidStands() {
            return allLemonaidStands;
        },
    };

});
},{}]},{},[1]);
