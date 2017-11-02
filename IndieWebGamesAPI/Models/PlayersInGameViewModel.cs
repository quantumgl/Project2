using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class PlayersInGameViewModel
    {
        public Games CurrGame { get; set; }
        public List<UserStatus> PinGame { get; set; }
    }
}