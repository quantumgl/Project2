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

    
    
    refresh_users = function (scope, http, log) {
        //console.log("Refresh status being called");
        http.get("https://indiewebgamesapi.azurewebsites.net/api/Users")
            .then(function (response) {
                console.log("Response list from API: " + JSON.stringify(response));
                scope.users = response.data;
            });
    }

    refresh_status = function ($scope, $http, $log)
    {
        UserStatus = function (name, code) {
            this.Name = name;
            this.codes = code;
        }

        AuthViewModel = function (name, userid) {
            this.name = name;
            this.userid = userid;
        }

        AuthenticateUserStatus = function (userName, code, userid) {
            this.userStatus = new UserStatus(userName, code);
            this.authViewModel = new AuthViewModel(userName, userid);
        }
        
        //authobj = {
        //    "userStatus":
        //    {
        //        "Name": $scope.name,
        //        "codes": 0
        //    },
        //    "authViewModel": {
        //        "Name": $scope.name,
        //        "userid": $scope.userid

        //    }
        //};

        authobj = new AuthenticateUserStatus($scope.name, 0, $scope.userid);
        //console.log("Problematic object: " + JSON.stringify(authobj));
        $http.post("https://indiewebgamesapi.azurewebsites.net/api/Users", authobj)
            //$http.post("http://localhost:59596/api/AuthViewModelTest", authobj)
            .then(function (response) {
                $scope.user_details = response.data;
                //$log.info(response);
                console.log(response);
            }, function (response) {
                console.log(response)
            }
            );               
    }

    authenticate = function ($scope, $http, $log) {
        
        authobj = {
            "userStatus":
            {
                "Name": $scope.name,
                "codes": 0
            },
            "authViewModel": {
                "Name": $scope.name,
                "userid": $scope.userid

            }
        };
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

    app.controller('addUser', function ($scope, $http, $scope) {

        //This is for getting the users that get authenticated with social logins
        $scope.online = function (name) {
            
                $scope.name = name;
                $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + name);
                console.log("hello from addUser");

        };

        $scope.login = function () {
            console.log("lmao");
        }

    });


    app.controller('callUsers', function ($scope, $http, $log, $rootScope) {
        //$http.get("http://indiewebgamesapi.azurewebsites.net/api/Users")
        //    .then(function (response) {
        //        $scope.users = response.data;
        //    });

        function myCallback() {
            if (debug == 1) {
                refresh_status($scope, $http);
                refresh_users($scope, $http);
            }
        }

        if (lock == 0) {
            lock = 1;
            $scope.name = document.getElementById("name").innerHTML;
            $scope.userid = document.getElementById("userid").innerHTML;
            console.log("Username: " + $rootScope.name);
            //console.log("Userid: " + $scope.userid);
            var intervalId = window.setInterval(myCallback, 1000);


            //authenticate($scope, $http, $log);
            //checkauth($scope, $http, $log);
        }
        else {
            console.log("Hunch confirmed");
        }
    });

    
    
})();