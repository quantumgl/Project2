//var app;
//(function () {
//    app = angular.module("APIModule", []);
//})();

//app.service("APIService", function ($http) {
//    this.getSubs = function ()
//    {
//        return $http.get("api/Users")
//    }
//}); 

//app.controller('APIController', function ($scope, APIService)
//{
//    getAll();

//    function getAll() {
//        var servCall = APIService.getSubs();
//        servCall.then(function (response)
//        {
//            $scope.subscriber = response.data;
//        },
//            function (error)
//            {
//                $log.error('Oops! Something went wrong while fetching the data.')
//            })
//    }
//})   

var app = angular.module('testModule', []);
var debug = 1;
var intervalId = window.setInterval(myCallback, 1000);
function myCallback()
{
    if (debug == 1)
    {
        //app.service("APIService", function ($http, $scope, $log)
        //{
        //    $http
        //        ({
        //            method: 'GET',
        //            url: 'http://indiewebgamesapi.azurewebsites.net/api/Users'
        //        }).then(function successCallback(response) {
        //            $scope.intervalId = response.data;
        //        });
        //});

        //app.service('callUsers', function ($scope, $http, $log) {
        //    $http.get("http://indiewebgamesapi.azurewebsites.net/api/Users")
        //        .then(function (response) {
        //            $scope.users = response.data;
        //        });
        //})
    }
}