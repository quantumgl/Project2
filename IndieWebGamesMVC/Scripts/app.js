(function () {
    var app = angular.module('myModule', []);

    app.controller('callUsers', function ($scope, $http, $log) {
        $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users")
            .then(function (response) {
                $scope.users = response.data;
            });
    })

    app.controller('addUser', function ($scope, $http, $log) {

        //This is for getting the users that get authenticated with social logins
        $scope.online = function(name) {
            $scope.name = name;
            $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + name)
                .then(function (response) {
                    $scope.user_details = response.data;
                    $log.info(response);
                });
        };

        //This is for getting the users that get authenticated using the internal login
        $scope.login = function () {
            console.log($scope.userName);
            $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + $scope.userName)
                .then(function (response) {
                    $log.info(response);
                });
        };

    });
})();