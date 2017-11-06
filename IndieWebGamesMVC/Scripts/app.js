var app = angular.module('myModule', ['dir', 'pubnub.angular.service']);

var debug = 1;
var lock = 0;

refresh_users = function (scope, http, log) {
    //console.log("Refresh status being called");
    http.get("https://indiewebgamesapi.azurewebsites.net/api/Users")
        .then(function (response) {
            //console.log("Response list from API: " + JSON.stringify(response));
            scope.users = response.data;
        });
}

refresh_status = function ($scope, $http, $log) {

    authobj = new AuthenticateUserStatus($scope.name, 0, $scope.userid);
    //console.log("Problematic object: " + JSON.stringify(authobj));
    $http.post("https://indiewebgamesapi.azurewebsites.net/api/Users", authobj)
        //$http.post("http://localhost:59596/api/AuthViewModelTest", authobj)
        .then(function (response) {
            $scope.user_details = response.data;
        });
}


    app.controller('userIconController', function ($scope, $http, $log) {
        $scope.name = document.getElementById("name").innerHTML;
        $scope.userid = document.getElementById("userid").innerHTML;
        $scope.icon_path = document.getElementById("userIconLoad");

    //$scope.userIcon = ;

    $scope.getUserIcon = function () {
        userIconGet($scope, $http, $log);
    };
    $scope.postUserIcon = function () {
        //do_the_post = function () {
        //    console.log($scope.userIcon);
        //    userIconPost($scope, $http, $log);
        //}

            prep_the_image = function () {
                //$scope.userIcon = new Image();
                //$scope.userIcon.onload = do_the_post;
                //console.log(file_reader.result);
                $scope.userIcon = file_reader.result;
                
                //console.log($scope.userIcon);
                console.log(file_reader.result);
                //userIconPost($scope, $http, $log);

        }

        var file = $scope.icon_path.files[0];
        //console.log(file);
        var file_reader = new FileReader();

        file_reader.onload = prep_the_image;
        file_reader.readAsDataURL(file);
        //console.log("postUserIcon is being called");
        //$scope.userIcon = file;
        //userIconPost($scope, $http, $log);



        //console.log(file);

        //console.log($scope.icon_path.value);
    };
});

app.controller('addUser', function ($scope, $http, $rootScope) {

        //This is for getting the users that get authenticated with social logins
        //$scope.online = function (name) {
            
        //        $rootScope.name = name;
        //        $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + name);

        //};

    $scope.login = function () {
        console.log("lmao");
    }

});


app.controller('callUsers', function ($scope, $http, $log, $rootScope) {

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

    app.controller("creatorController",

        function creatorController($scope, $http) {

            $scope.bgimg;
            $scope.bgm;
            $scope.levelname;

        });


    app.directive("fileread", [
        function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            }
        }
    ]);

    app.directive("textread", [
            function () {
                return {
                    scope: {
                        textread: "="
                    },
                    link: function (scope, element, attributes) {
                        element.bind("change", function (changeEvent) {
                            scope.textread = changeEvent.target.value;
                        });
                    }
                }
            }

    ]);

app.controller("chatCtrl", function ($scope, $http, $rootScope) {
    /***
      * Configurable global variables
      ***/
    $scope.chatChannel = "angular_chat";
    $scope.messageLimit = 25;
    $scope.defaultUsername = $rootScope.name;

    /***
     * Static global variables
     ***/

    $scope.errorMsg;
    $scope.realtimeStatus = 0;

    /***
     * Purpose: clear the message object
     * Precondition: none
     * Postcondition: message object has been reset
     ***/
    $scope.clearMsg = function () {
        $scope.message = {
            username: $scope.defaultUsername,
            text: ''
        };
    }

    $scope.clearMsg();
    /***
     * Purpose: load the existing chat logs
     * Precondition: none
     * Postcondition: chat logs have been loaded
     ***/
    $scope.chatLogs = function () {
        PUBNUB.history({
            channel: $scope.chatChannel,
            limit: $scope.messageLimit
        }, function (messages) {
            // Shows All Messages
            $scope.$apply(function () {
                $scope.chatMessages = messages;
            });
        });
    }


    /***
     * Purpose: remove error message formatting when the message input changes
     * Precondition: none
     * Postcondition: error message class removed from message input
     ***/
    $scope.$watch('message.text', function (newValue, oldValue) {
        if (newValue)
            $("#inputMessage").removeClass("error");
        $scope.errorMsg = "";
    }, true);

    /***
     * Purpose: trying to post a message to the chat
     * Precondition: loggedIn
     * Postcondition: message added to chatMessages and sent to chatLog
     ***/
    $scope.postMessage = function () {

        //make sure they enter a chat message
        if (!$scope.message.text) {
            $scope.errorMsg = "You must enter a message.";
            $("#inputMessage").addClass("error");
            return;
        }
        //set the message date
        d = new Date();
        $scope.message.date = new Date();

        PUBNUB.publish({
            channel: $scope.chatChannel,
            message: $scope.message
        });

        $scope.message.text = "";

    };

    /***
     * Purpose: connect and access pubnub channel
     * Preconditions: pubnub js file init
     * Postconditions: pubnub is waiting and ready
     ***/
    PUBNUB.subscribe({
        channel: $scope.chatChannel,
        restore: false,
        callback: function (message) {
            //update messages with the new message
            $scope.$apply(function () {
                $scope.chatMessages.push(message);
            });
        },

        error: function (data) {
            $scope.errorMsg = data;
        },

        disconnect: function () {
            $scope.$apply(function () {
                $scope.realtimeStatus = 0;
            });
        },

        reconnect: function () {
            $scope.$apply(function () {
                $scope.realtimeStatus = 1;
            });
        },

        connect: function () {
            $scope.$apply(function () {
                $scope.realtimeStatus = 2;
                //load the chat logs
                $scope.chatLogs();
            });
        }
    });

    /***
     * Purpose: trying to post a message to the chat
     * Precondition: loggedIn
     * Postcondition: message added to chatMessages and sent to chatLog
     ***/
    $scope.attemptLogout = function () {
        $("#inputMessage").removeClass("error");
        $scope.clearMsg();
        $scope.loggedIn = false;
    }
});
