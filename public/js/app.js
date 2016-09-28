var app = angular.module('letterToRep', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {

  $routeProvider.when('/', {
      templateUrl: 'templates/templates.main.html',
      controller: 'mainCtrl'
    });
});
