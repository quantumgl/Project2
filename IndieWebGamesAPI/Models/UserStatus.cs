using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
  
        public class UserStatus
        {
            public string Name { get; set; }
            public DateTime LastPing { get; set; }
            public int gameStatus { get; set; }
    }
}