using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public enum StatCodes { Online, Away, Busy, Playing }

    public class UserStatus
        {
            public string Name { get; set; }
            public DateTime LastPing { get; set; }
            public StatCodes codes { get; set; }
    }
}