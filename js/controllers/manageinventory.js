module.exports = {
    name: 'ManageInventoryController',
    func: function ($scope, $state, LemonaidService) {
        const currentStand = LemonaidService.getCurrentStand();
        //console.log('this is my currentstand' + currentStand);

        if (currentStand === undefined) {
            $state.go('create-stand');
        } else {
            LemonaidService.getStand(currentStand.stand_id)
                .then(function (response) {
                    let stand = response.data;

                    stand.name = currentStand.stand_name;

                    stand.ingredients.forEach(function(ingredient){
                        if(ingredient.label === 'ice') {
                            ingredient.price = '$0.50';
                        }
                        if(ingredient.label === 'lemons') {
                            ingredient.price = '$2.00';
                        }
                        if(ingredient.label === 'ice') {
                            ingredient.price = '$1.25';
                        }
                        if(ingredient.label === 'ice') {
                            ingredient.price = '$0.10';
                        }
                    })

                    $scope.stand = stand;
                    $scope.stats = [{
                        title: 'Day',
                        value: stand.day,
                    },{
                        title: 'Balance',
                        value: stand.business.balance,
                    },{
                        title: 'Visitors',
                        value: stand.business.yesterday_visitors,
                    },{
                        title: 'Customers',
                        value: stand.business.yesterday_cups_sold,
                    }];
                });

                LemonaidService.getWeather()
                    .then(function(response){
                        let result = response.data
                        $scope.weather = [{
                            temperature: result.temperature,
                            condition: result.condition,
                         }];
                    });
        }
    }
}