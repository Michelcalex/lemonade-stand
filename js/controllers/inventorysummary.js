module.exports = {
    name: 'InventorySummaryController',
    func: function ($scope, $state, LemonaidService) {
        $scope.buy = function(ingred) {
            LemonaidService.buyIngredient(ingred)
                .then(function(response) {
                    debugger;
                });
        };
    },
};
