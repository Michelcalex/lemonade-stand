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



                    // const listOfIngred = stand.ingredients;

                    // for(let i = 0; i < listOfIngred.length; i++) {
                    //     if(listOfIngred[i].label === 'ice') {
                    //         listOfIngred[i].price = '$0.50';
                    //     }
                    //     if(listOfIngred[i].label === 'lemons') {
                    //         listOfIngred[i].price = '$2.00';
                    //     }
                    //     if(listOfIngred[i].label === 'sugar') {
                    //         listOfIngred[i].price = '$1.25';
                    //     }
                    //     if(listOfIngred[i].label === 'cups') {
                    //         listOfIngred[i].price = '$0.10';
                    //     }
                    // }

                    // $scope.listOfIngred = listOfIngred;
            

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
                        title: 'Balance',
                        value: stand.business.yesterday_cups_sold,
                    }];
                    
                    console.log($scope.stand);
                });
            



        }
    }
}