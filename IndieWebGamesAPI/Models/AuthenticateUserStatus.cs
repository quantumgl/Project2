using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class AuthenticateUserStatus
    {
        public UserStatus userStatus { get; set; }
        public AuthViewModel authViewModel { get; set; }
    }
}