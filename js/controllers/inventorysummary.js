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