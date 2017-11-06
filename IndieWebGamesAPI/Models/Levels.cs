using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class Levels
    {
        public int Id { get; set; }
        public IndiePlayerProfile Creator { get; set; }
        public string Bgmurl { get; set; }
        public string Bgimgurl { get; set; }
        public string LevelName { get; set; }
    }
}