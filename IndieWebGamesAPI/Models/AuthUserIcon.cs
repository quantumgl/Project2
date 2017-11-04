using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class AuthUserIcon
    {
        public UserIcon userIcon { get; set; }
        public AuthViewModel authViewModel { get; set; }
    }
}