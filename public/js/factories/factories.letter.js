app.factory('Letter',['$http', function($http) {
    return {
        create: function(letter) {
            return $http.post('/api/letter', letter);
        }
    }
}]);
