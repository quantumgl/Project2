
var servers = ["http://localhost:59596", "https://indiewebgamesapi.azurewebsites.net"];

var serv = servers[0];

var userIconGet = function (scope, http, log) {
    http.get("http://localhost:59596/api/UserIcon/?Username=" + scope.name)
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
    console.log(scope.userIcon.src);
    //debugger;
    authUserIcon = new AuthUserIcon(scope.name, scope.userIcon.src, scope.userid);

    http.post(serv + "/api/UserIcon", authUserIcon).then(
        function (response) {
            console.log(response);
        },
        function (error) {
            console.log(error);
        });
        
};