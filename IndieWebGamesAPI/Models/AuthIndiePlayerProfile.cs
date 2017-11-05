using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class AuthIndiePlayerProfile
    {
        public IndiePlayerProfile indiePlayerProfile { get; set; }
        public AuthViewModel authViewModel { get; set; }
    }
}