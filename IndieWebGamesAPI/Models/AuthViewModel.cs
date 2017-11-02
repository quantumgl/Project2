using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Models
{
    public class AuthViewModel
    {
        public string name { get; set; }
        public string userid { get; set; }
        public bool isAuthentic
        {
            get
            {
                IdentityDataModelCode identityData = new IdentityDataModelCode();
                var user = identityData.AspNetUsers.Find(userid);
                return user == null ? false : user.UserName == name;
            }
            set { }
        }
    }
}