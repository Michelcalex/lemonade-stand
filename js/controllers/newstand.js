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