
var UserStatus = function (name, code)
{
    this.Name = name;
    this.codes = code;
}

var AuthViewModel = function (name, userid)
{
    this.name = name;
    this.userid = userid;
}

var AuthenticateUserStatus = function (userName, code, userid)
{
    this.userStatus = new UserStatus(userName, code);
    this.authViewModel = new AuthViewModel(userName, userid);
}

var UserIcon = function (image, name)
{
    this.Blob = image;
    this.Name = name;
}

var AuthUserIcon = function (userName, image, userid)
{
    this.userIcon = new UserIcon(image, userName);
    this.authViewModel = new AuthViewModel(userName, userid);
}