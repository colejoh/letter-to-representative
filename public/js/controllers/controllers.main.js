app.controller("mainCtrl", ['$scope', 'Letter',
  function($scope, Letter) {
    $scope.letterState = "compose";
    $scope.letter = {};

    $scope.confirm = function() {
      $scope.letterState = "confirm";
      console.log($scope.letter);
    };

    $scope.message = "failure"
    $scope.send = function() {
      Letter.create($scope.letter).success(function(data){
        $scope.message = "success";
      })
      $scope.letterState = "message";
    }

  }
]);
