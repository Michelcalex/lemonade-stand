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
            $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
                stand_name: stand.standName,
            }).then(function(response) {
                // will run if success in POST
                allLemonaidStands.push({ 
                    stand_name: stand.stand_name,
                    stand_id: response.data.stand_id 
                });

            }).catch(function(error) {
                // will run if error in POST
            });
        },
        getLemonaidStands() {
            return allLemonaidStands;
        },
    };

});