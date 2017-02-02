// app.controller('NewStandController', function($scope, LemonaidService) {

//     $scope.standName = '';
//     $scope.stands = LemonaidService.getLemonaidStands();

//     $scope.add = function() {
//         console.log('I added a stand');
//         LemonaidService.addStand($scope.standName);
//         console.log(LemonaidService.getLemonaidStands());
//     }
// });



module.exports = {
    name: 'NewStandController',
    func: function ($scope, LemonaidService) {
        // $scope.standName = '';
        // $scope.stands = LemonaidService.getLemonaidStands();

        // $scope.add = function () {
        //     console.log('I added a stand');
        //     LemonaidService.addStand($scope.standName);
        //     console.log(LemonaidService.getLemonaidStands());
        //     }
        console.log('I am working');
        },
};