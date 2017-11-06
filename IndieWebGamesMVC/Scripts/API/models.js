
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

var IndiePlayerProfile = function (profileName)
{
    this.Username = profileName;
    this.Bio = "";
    this.Iconurl = "";
}

var AuthIndiePlayerProfile = function (name, userid)
{
    this.indiePlayerProfile = new IndiePlayerProfile(name)
    this.authViewModel      = new AuthViewModel(name, userid)
}


