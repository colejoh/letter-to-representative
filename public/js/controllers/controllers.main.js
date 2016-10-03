app.controller("mainCtrl", ['$scope', '$http',
  function($scope, $http, Letter) {
    // Variables to hold response data and others
    $scope.showConfirm = true;
    $scope.sendCall = {}
    $scope.letterState = "compose";
    $scope.letter = {};
    $scope.sendCall.letter = $scope.letter;
    $scope.response;

    // Dummy Data
    $scope.letter.firstName = "Cole";
    $scope.letter.lastName = "Johnson";
    $scope.letter.lineOne = "745 Old Ivy Rd";
    $scope.letter.city = "Atlanta";
    $scope.letter.state = "Ga";
    $scope.letter.message = "Hello good to meet you";


    /*
     * Hits Google's representative API to find which person represents the specific
     * address. Another purpose of this method is to format the user's address to send
     * to Lob
     */
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
    };


    /*
     * This sends the Google API response along with the letter data to reate a Lob request
     */
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


    /*
     * This will change the view depending on what is specified.
     * @param where - string of view to change to
     */
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
