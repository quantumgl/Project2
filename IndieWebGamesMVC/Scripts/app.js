var app = angular.module('myModule', [])
    .controller('callUsers', function ($scope, $http, $log) {
        $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users")
            .then(function (response) {
                $scope.users = response.data;
                $log.info(response);
            });
    });