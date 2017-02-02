module.exports = {
    name: 'LemonaidService',
    func: function($http, $state) {
        const allLemonaidStands =[];

        //TODO: ingredients, stats
        const stats = [];

        const ingredients = [];


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
            getStand(standId) {
                $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + standId)
                    .then(function (info) {
                    stats.push({
                        day: info.data.day,
                        balance: info.data.business.balance,
                        vistors: info.data.business.yesterday_visitors,
                        customers: info.data.business.yesterday_cups_sold,
                    });
                });
                return $http.get('https://blooming-hamlet-70507.herokuapp.com/stand/' + standId);
            },
            getLemonaidStands() {
                return allLemonaidStands;
            },

            getCurrentStand() {
                return allLemonaidStands[allLemonaidStands.length - 1];
            },
        };
    }
}