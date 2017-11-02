﻿(function () {
    var app = angular.module('myModule', []);

    var debug = 1;
    var lock = 0;
    //var intervalId = window.setInterval(myCallback, 1000);
    //function myCallback() {
    //    if (debug == 1) {
    //        console.log("Turning this thing on");
    //    }
    //}
    //Proper angularjs syntax?
    refresh_users = function ($scope, $http, $log)
    {
        //console.log("Refresh status being called");
        $http.get("https://indiewebgamesapi.azurewebsites.net/api/Users")
            .then(function (response)
            {
                $scope.users = response.data;
            });
    }

    refresh_status = function ($scope, $http, $log)
    {
        var name = $scope.name;
        //console.log(name);
        $scope.online = function (name)
        {
            $scope.name = name;
            //console.log("How many times this is being called");
            $http.get("https://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + $scope.name)
                .then(function (response)
                {
                    

                    $scope.user_details = response.data;
                    //$log.info(response);
                    //console.log("Posting..." + $scope.name);
                },
                function (response)
                {
                    //console.log(response);
                });
        }
        $scope.online(name);
    }

    authenticate = function ($scope, $http, $log) {
        
        authobj = { "name": $scope.name, "userid": $scope.userid };
        console.log("Problematic object: " + authobj);
        $http.post("http://indiewebgamesapi.azurewebsites.net/api/AuthViewModelTest", authobj)
        //$http.post("http://localhost:59596/api/AuthViewModelTest", authobj)
            .then(function (response) {
                $scope.user_details = response.data;
                $log.info(response);
            }, function (response) {
                console.log(response)
            }
        );
    }

    checkauth = function ($scope, $http, $log) {
        $http.get("http://indiewebgamesapi.azurewebsites.net/api/AuthViewModelTest")
            .then(function (response) {
                $scope.user_details = response.data;
                //$log.info(response);
            });
    }


    app.controller('callUsers', function ($scope, $http, $log)
    {
        //$http.get("http://indiewebgamesapi.azurewebsites.net/api/Users")
        //    .then(function (response) {
        //        $scope.users = response.data;
        //    });

        function myCallback()
        {
            if (debug == 1)
            {
                refresh_status($scope, $http, $log);
                refresh_users($scope, $http, $log);
            }
        }

        if (lock == 0) {
            lock = 1;
            $scope.name = document.getElementById("name").innerHTML;
            $scope.userid = document.getElementById("userid").innerHTML;
            console.log("Username: " + $scope.name);
            console.log("Userid: " + $scope.userid);
            var intervalId = window.setInterval(myCallback, 1000);

            
            authenticate($scope, $http, $log);
            checkauth($scope, $http, $log);
        }
        else {
            console.log("Hunch confirmed");
        }
    })

    app.controller('addUser', function ($scope, $http, $log)
    {

        //This is for getting the users that get authenticated with social logins
        $scope.online = function (name)
        {
            $scope.name = name;
            $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + name)
                .then(function (response)
                {
                    
                    $scope.user_details = response.data;
                    //$log.info(response);
                });
        };

        //This is for getting the users that get authenticated using the internal login
        $scope.login = function ()
        {
            //console.log($scope.userName);
            $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + $scope.userName)
                .then(function (response)
                {
                    
                    //$log.info(response);
                });
        };

    });
})();