const app = angular.module('LemonaidStandApp', ['ui.router']);


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


app.factory('LemonaidService', function() {
    const allLemonaidStands =[];

    return {
        addStand(stand) {
            allLemonaidStands.push(stand);
        },
        getLemonaidStands() {
            return allLemonaidStands;
        },
    };

});