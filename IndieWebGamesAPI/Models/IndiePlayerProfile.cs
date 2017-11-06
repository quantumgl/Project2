using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class IndiePlayerProfile
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Bio { get; set; }
        public string Iconurl { get; set; }
        public virtual ICollection<Level> Levels { get; set; }
        public virtual ICollection<IndiePlayerProfile> FollowedPlayers { get; set; }
    }
}