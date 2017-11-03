
var userIconGet = function (scope, http, log) {
    http.get("https://indiewebgamesapi.azurewebsites.net/api/UserIcon" + scope.name)
        .then(function (response) {
            scope.userIcon = response.data;
            document.getElementById("userIconShow").src = "data:image/png;base64," + scope.userIcon;
        }, function (error) {
            console.log(error);
        });
};

var userIconPost = function (scope, http, log) {
    //scope.userIcon = document.getElementById("userIconLoad").value;
    //console.log(scope.name);
    //console.log(scope.userid);
    //console.log(scope.icon_path);

    console.log(scope.userIcon.src);

    authUserIcon = new AuthUserIcon(scope.name, scope.userIcon.src, scope.log);

    http.post("https://indiewebgamesapi.azurewebsites.net/api/UserIcon", authUserIcon);
        
};