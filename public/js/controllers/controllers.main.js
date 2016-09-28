app.controller("mainCtrl", ['$scope', '$http', 'Letter',
  function($scope, $http, Letter) {
    $scope.letterState = "compose";
    $scope.letter = {};

    // Dummy Data
    $scope.letter.firstName = "Cole";
    $scope.letter.lastName = "Johnson";
    $scope.letter.lineOne = "745 Old Ivy Rd";
    $scope.letter.city = "Atlanta";
    $scope.letter.state = "Ga";
    $scope.letter.message = "Hello good to meet you";



    $scope.confirm = function() {
      // $http.get('/api/').then(function(response){
      //   console.log(response.data);
      // });
      $scope.letterState = "confirm";
      console.log($scope.letter);
    };

    $scope.message = "failure";
    $scope.response;
    $scope.send = function() {
      $http.post('/api/', $scope.letter).success(function(data) {
        $scope.response = data;
        $scope.message = "Succsess";
      }).error(function(data) {
        $scope.message = "Failure"
      })
      // Letter.create($scope.letter).success(function(data){
      //   $scope.message = "success";
      // })
      $scope.letterState = "message";
    }

  }
]);
