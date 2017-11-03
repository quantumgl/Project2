(function () {
    var app = angular.module('myModule', []);

    var debug = 1;
    var lock = 0;

    refresh_users = function (scope, http, log) {
        //console.log("Refresh status being called");
        http.get("https://indiewebgamesapi.azurewebsites.net/api/Users")
            .then(function (response) {
                for (user in response.data) {
                    //console.log("Username: " + user.name + "Online Status: " + user.code);
                    //console.log("Username: " + response.data[user].name + "\tonline status: " + response.data[user].codes);
                }
                
                scope.users = response.data;
            });
    }

    refresh_status = function ($scope, $http, $log) {       

        authobj = new AuthenticateUserStatus($scope.name, $scope.status, $scope.userid);
        //console.log("Problematic object: " + JSON.stringify(authobj));
        $http.post("https://indiewebgamesapi.azurewebsites.net/api/Users", authobj)
            //$http.post("http://localhost:59596/api/AuthViewModelTest", authobj)
            .then(function (response) {
                $scope.user_details = response.data;
                //$log.info(response);
                //console.log(response);
            }, function (response) {
                console.log(response)
            }
            );
    }

    //var statusSet = function (scope, http, log) {

    //}

    //app.controller("statusController", function ($scope, $http, $log) {
    //    $scope.change_status = function (click_status) {

    //    }

    //});


    app.controller('userIconController', function ($scope, $http, $log) {
        $scope.name = document.getElementById("name").innerHTML;
        $scope.userid = document.getElementById("userid").innerHTML;
        $scope.icon_path = document.getElementById("userIconLoad");
        
        //$scope.userIcon = ;

        $scope.getUserIcon = function () {
            userIconGet($scope, $http, $log);
        };
        $scope.postUserIcon = function () {
            do_the_post = function () {
                console.log($scope.userIcon);
                userIconPost($scope, $http, $log);
            }

            prep_the_image = function () {
                $scope.userIcon = new Image();
                $scope.userIcon.onload = do_the_post;
                $scope.userIcon.src = file_reader.result;
                
            }

            var file = $scope.icon_path.files[0];
            console.log(file);
            var file_reader = new FileReader();

            file_reader.onload = prep_the_image;
            file_reader.readAsDataURL(file);


            //console.log(file);

            //console.log($scope.icon_path.value);
            
        };
    });



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