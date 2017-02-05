module.exports = {

    name: 'HighScoresController', 
    func: function($scope, LemonaidService) {
        console.log('I am highscore controller');
        LemonaidService.getHighScores()
            .then(function(response) {
                $scope.scores = response.data;
            });
    }
    
};