module.exports = {
    name: 'LemonaidService',
    func: function($http, $state) {
        const allLemonaidStands =[];

        return {
            addStand(standName) {
                $http.post('https://blooming-hamlet-70507.herokuapp.com/stand', {
                    stand_name: standName,
                }).then(function(response) {
                    // will run if success in POST
                    allLemonaidStands.push({ 
                        stand_name: standName,
                        stand_id: response.data.stand_id 
                    });
                    $state.go('manage-inventory');

                    //console.log('AFTER', allLemonaidStands);

                }).catch(function(error) {
                    // will run if error in POST
                });
            },
            buyIngredient(ingredientLabel, quantity, standId) {
                return $http.post('https://blooming-hamlet-70507.herokuapp.com/stand/update?id=' + standId, {
                    property: "ingredients." + ingredientLabel,
                    add: quantity,
                });
            },
            getStand(standId) {
                return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + standId);
            },
            getLemonaidStands() {
                return allLemonaidStands;
            },

            getCurrentStand() {
                return allLemonaidStands[allLemonaidStands.length - 1];
            },

            getHighScores() {
                return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/top')
            },
        };
    }
}