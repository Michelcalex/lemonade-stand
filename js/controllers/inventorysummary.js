module.exports = {
    name: 'InventorySummaryController',
    func: function ($scope, $state, LemonaidService) {
            $scope.buy = function(ingredientLabel, quantity) {
                console.log(LemonaidService.getCurrentStand().stand_id);
                LemonaidService.buyIngredient(ingredientLabel, quantity, LemonaidService.getCurrentStand().stand_id)
                    .then(function(response) {
                        debugger;
                    });
            }
    },
};




//standIngred.push({
    //                     property: response.data.ingredients.label,
    //                     add: quantity, 
    //                 });
    //                 console.log(standIngred);