app.controller("mainCtrl", ['$scope', '$http', 'Letter',
  function($scope, $http, Letter) {
    $scope.sendCall = {}
    $scope.letterState = "compose";
    $scope.letter = {};
    $scope.sendCall.letter = $scope.letter;

    // Dummy Data
    $scope.letter.firstName = "Cole";
    $scope.letter.lastName = "Johnson";
    $scope.letter.lineOne = "745 Old Ivy Rd";
    $scope.letter.city = "Atlanta";
    $scope.letter.state = "Ga";
    $scope.letter.message = "Hello good to meet you";



    $scope.confirm = function() {
      // Hits Google API
      $scope.googleResponse;
      $http.post('/api/representative', $scope.letter).success(function(data) {
        $scope.googleResponse = data;
        $scope.sendCall.googleResponse = data;
        if($scope.googleResponse.name === "StatusCodeError") {
          $scope.letterState = "error";
        } else {
          $scope.letterState = "confirm";
        }
      }).error(function(data) {
        $scope.message = "Failure";
      });

      console.log($scope.googleResponse);
    };



    $scope.response;
    $scope.send = function() {
      $http.post('/api/letter', $scope.sendCall).success(function(data) {
        $scope.response = data;
        if($scope.response.name === "StatusCodeError") {
          $scope.letterState = "error";
        } else {
          $scope.letterState = "message";
        }
      }).error(function(data) {
        $scope.message = "Failure"
      })
    }

    $scope.go = function(where){
      switch (where) {
        case "home":
          $scope.letterState = "compose";
          break;
        default:
          $scope.letterState = "compose";
      }
    }

  }
]);
