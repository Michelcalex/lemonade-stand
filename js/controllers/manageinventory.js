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