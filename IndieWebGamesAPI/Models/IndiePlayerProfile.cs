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
        public List<Levels> CreatedLevels { get; set; }
        public virtual List<IndiePlayerProfile> FollowedPlayers { get; set; }
    }
}