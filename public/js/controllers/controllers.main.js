app.controller("mainCtrl", ['$scope', '$http',
  function($scope, $http) {
    // Variables to hold response data and others
    $scope.showConfirm = true;
    $scope.sendCall = {}
    $scope.letterState = "compose";
    $scope.letter = {};
    $scope.sendCall.letter = $scope.letter;
    $scope.response;

    // Dummy Data
    // $scope.letter.firstName = "Cole";
    // $scope.letter.lastName = "Johnson";
    // $scope.letter.lineOne = "745 Old Ivy Rd";
    // $scope.letter.city = "Atlanta";
    // $scope.letter.state = "Ga";
    // $scope.letter.message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in libero a libero consequat ultrices. Vivamus vehicula rhoncus auctor. Vivamus scelerisque libero magna, quis finibus sapien suscipit in. Suspendisse viverra lectus lorem, ac rhoncus diam lobortis eu. In sodales bibendum nunc vel tincidunt. Pellentesque eget tincidunt nibh. In lacinia elementum lectus nec porta. Etiam egestas nisl ex, et pulvinar lacus ultrices eget. Cras aliquam nunc vitae tellus feugiat, a aliquam purus sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum euismod magna quis ex vulputate euismod. In at metus ut erat tempus facilisis. Ut sit amet augue lacus. Nam dignissim, quam in gravida interdum, ante neque eleifend leo, eget semper lacus orci sed augue. Donec fermentum libero ac ex dictum commodo. Proin semper porta auctor. Integer eget mi quis ligula mattis sollicitudin id eget ante. Nullam pharetra odio nec ante vestibulum maximus. Nunc turpis ante, porta consectetur tincidunt sed, ultricies eget eros. Vestibulum id blandit lacus. Integer eget arcu sollicitudin, fermentum dolor in, dictum mi. Fusce laoreet arcu eget nulla pulvinar efficitur. Nulla venenatis mi et enim luctus ultricies. Phasellus id eros sit amet elit fringilla hendrerit a in urna. Morbi vel egestas neque.";

    // Char count
    $scope.$watch('letter.message', function(newValue, oldValue) {
      $scope.charCount = 10000 - $scope.letter.message.length;
      if($scope.charCount <= 0) {
        $scope.disabled = "disabled";
      } else {
        $scope.disabled = "";
      }
    })


    /*
     * Hits Google's representative API to find which person represents the specific
     * address. Another purpose of this method is to format the user's address to send
     * to Lob
     */
    $scope.confirm = function() {
      // Hits Google API
      $scope.googleResponse;
      $scope.error = "";
      $http.post('/api/representative', $scope.letter).success(function(data) {
        $scope.googleResponse = data;
        $scope.sendCall.googleResponse = data;

        if($scope.googleResponse.name === "StatusCodeError") {
          $scope.letterState = "error";
        } else {
          $scope.letterState = "confirm";
        }
        // Case for if the google API can't find the address
        if(data.officials == null) {
          $scope.letterState = "error";
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
        if(data.status_code > 400) {
          $scope.errorMessage = data._response.body.error.message;
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
