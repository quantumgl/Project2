
var servers = ["http://localhost:59596", "https://indiewebgamesapi.azurewebsites.net"];

var serv = servers[0];

var userIconGet = function (scope, http, log) {
    http.get(serv + "/api/UserIcon/?Username=" + scope.name)
        .then(function (response) {
            scope.userIcon = response.data;
            document.getElementById("userIconShow").src = scope.userIcon;
        }, function (error) {
            console.log(error);
        });
};

var userIconPost = function (scope, http, log) {
    //scope.userIcon = document.getElementById("userIconLoad").value;
    //console.log(scope.name);
    //console.log(scope.userid);
    //console.log(scope.icon_path);
    //debugger;
    //console.log(scope.userIcon);
    //debugger;
    authUserIcon = new AuthUserIcon(scope.name, scope.userIcon, scope.userid);

    http.post(serv + "/api/UserIcon", authUserIcon).then(
        function (response) {
            console.log(response);
        },
        function (error) {
            console.log(error);
        });
        
};


var refresh_status = function (scope, http, log) {

    authobj = new AuthenticateUserStatus(scope.name, 0, scope.userid);
    //console.log("Problematic object: " + JSON.stringify(authobj));
    http.post("https://indiewebgamesapi.azurewebsites.net/api/Users", authobj)
        //$http.post("http://localhost:59596/api/AuthViewModelTest", authobj)
        .then(function (response) {
            scope.user_details = response.data;
        });
}

var refresh_users = function (scope, http, log) {
    //console.log("Refresh status being called");
    http.get("https://indiewebgamesapi.azurewebsites.net/api/Users")
        .then(function (response) {
            //console.log("Response list from API: " + JSON.stringify(response));
            scope.users = response.data;
        });
}

//small library
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
        type: mimeString
    });
}