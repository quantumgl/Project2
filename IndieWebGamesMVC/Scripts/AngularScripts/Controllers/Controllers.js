var usersModule = angular.module("usersModule", []).config(function ($routeProvider, $locationProvider) {
    //Path - it should be same as href link
    $routeProvider.when('/Users', { templateUrl: '/Users/Index.html' });
    $locationProvider.html5Mode(true);
});