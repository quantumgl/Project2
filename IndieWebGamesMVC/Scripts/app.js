(function () {
    var app = angular.module('myModule', []);

    app.controller('callUsers', function ($scope, $http, $log) {
        $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users")
            .then(function (response) {
                $scope.users = response.data;
            });
    })

    app.controller('addUser', function ($scope, $http, $log) {

        $scope.online = function(name) {
            $scope.name = name;
            $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + name)
                .then(function (response) {
                    $scope.user_details = response.data;
                    $log.info(response);
                });
        }

        $scope.login = function () {
            console.log($scope.userName);
            $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + $scope.userName)
                .then(function (response) {
                    $scope.user_details = response.data;
                    $log.info(response);
                });
        };

        

        });
})();