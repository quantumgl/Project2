var app = angular.module('myModule', ['dir', 'pubnub.angular.service']);

var debug = 1;
var lock = 0;

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
        if (debug === 1) {
            //refresh_status($scope, $http);
            //refresh_users($scope, $http);
        }
    }

    if (lock === 0) {
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


app.controller("profileController",

    function profileController($scope, $http, $rootScope) {

        $scope.iconurl;
        $scope.iconDataUri;

        $scope.loadprofile = function () {
            $scope.username = document.getElementById("name").innerHTML;
            $rootScope.username = document.getElementById("name").innerHTML;
            $scope.userid = document.getElementById("userid").innerHTML;
            console.log("Hello nurse");

            $rootScope.indieProfile;
            $rootScope.authIndieProfile;

            $http.get("http://localhost:59596/api/IndiePlayerProfiles?Username=" + $scope.username)
                .then(function (response) {
                    console.log("success", response);
                    $rootScope.indieProfile = response.data;
                },
                function (error) {
                    console.log("error", error);
                    console.log($scope.username);
                    $rootScope.authIndieProfile = new AuthIndiePlayerProfile($scope.username, $scope.userid);
                    console.log($rootScope.authIndieProfile);
                    $http.post("http://localhost:59596/api/IndiePlayerProfiles", $rootScope.authIndieProfile)
                        .then(function (response) {
                            $rootScope.indieProfile = response.data;
                            $rootScope.iconurl = $rootScope.indieProfile.Iconurl;
                        },
                        function (error) {
                            console.log(error);
                        });

                }
                )
        };

        $scope.uploadIcon = function () {
            var fd = new FormData();
            var imgBlob = dataURItoBlob($scope.iconDataUri);
            fd.append($scope.username, imgBlob);
            $http.post(
                'http://localhost:59596/api/upload?Username=' + $rootScope.username,
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }
            )
                .then(function (response) {
                    console.log('success', response);
                    $rootScope.indieProfile.iconurl = "https://indiewebgames.blob.core.windows.net/icons/" + $rootScope.username;
                    authViewModel = new AuthViewModel($scope.username, $scope.userid);
                    indiePlayerProfile = $rootScope.indieProfile;
                    authIndieProfile = { indiePlayerProfile, authViewModel };
                    $http.put('http://localhost:59596/api/IndiePlayerProfiles/' + $rootScope.indieProfile.id, indiePlayerProfile).then(
                        function (response) {
                            $http.get('http://localhost:59596/api/IndiePlayerProfiles?Username=' + $rootScope.username)
                                .then(function (response) {
                                    $rootScope.indieProfile = response.data;
                                    console.log("refreshed profile from server");
                                },
                                function (error) { })
                        }, function (error) { }
                    );
                },
                function (response) {
                    console.log('error', response);
                });
        }

    });

app.controller("creatorController",

    function creatorController($scope, $http) {

        $scope.bgimg;
        $scope.bgm;
        $scope.levelname;

        $scope.uploadImage = function () {
            var fd = new FormData();
            var imgBlob = dataURItoBlob($scope.uploadme);
            fd.append('file', imgBlob);
            $http.post(
                'imageURL',
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }
            )
                .success(function (response) {
                    console.log('success', response);
                })
                .error(function (response) {
                    console.log('error', response);
                });
        }
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



app.controller("chatCtrl", function ($scope, $http, $rootScope)
{
    /***
      * Configurable global variables
      ***/

    //$scope.chatChannel = "indiewebgames";
    $scope.chatChannel = "angular_chat";
    $scope.messageLimit = 25;
    $scope.defaultUsername = $rootScope.username;

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
    };


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

    // SEARCH FEATURE *still not working as intended*
    app.filter('searchFor', function () {

        // All filters must return a function. The first parameter
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        return function (arr, searchString) {

            if (!searchString) {
                return arr;
            }

            var result = [];

            searchString = searchString.toLowerCase();

            // Using the forEach helper method to loop through the array
            angular.forEach(arr, function (item) {

                if (item.title.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }

            });

            return result;
        };

    });

    // The controller

    app.controller('SearchController', function ($scope, $http, $rootScope)
    {
        // The data model. These items would normally be requested via AJAX,
        // but are hardcoded here for simplicity. See the next example for
        // tips on using AJAX.
        $scope.searchresults;
        $scope.callRestService = function ()
        {
            $http.get('http://localhost:59596/api/SearchResult?search=' + $scope.search)
                .then(function (response) {
                    $scope.searchresults = response.data;
                    //$scope.results.push(response);  //retrieve results and add to existing results
                })
        }

        //$scope.online = function (name)
        //{
        //    $rootScope.name = name;
        //    //$http.get("
        //}

        //$scope.items = [
        //    {
        //        url: 'http://indiewebgamesapi.azurewebsites.net/api/Users?UserName=" + name',
        //        title: '$scope.name',
        //        image: 'http://www.tutorialspoint.com/android/images/android-mini-logo.jpg'
        //    }
        //];
    });

//app.directive("searchread", [
//    function () {
//        return {
//            scope: {
//                searchread: "="
//            },
//            link: function (scope, element, attributes) {
//                element.bind("change", function (changeEvent) {
//                    scope.searchread = changeEvent.target.value;
//                    //scope.callRestService();
//                });
//            }
//        }
//    }

//]);

    app.directive('myOnKeyDownCall', function ()
    {
        return function (scope, element, attrs)
        {
            element.bind("keydown keypress", function (event)
            {
                scope.$apply(function ()
                {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            });
        };
    });

