using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    public class Level
    {
        public int Id { get; set; }
        [ForeignKey("IndiePlayerProfile")]
        public int CreatorId { get; set; }
        public string Bgmurl { get; set; }
        public string Bgimgurl { get; set; }
        public string LevelName { get; set; }
    }
}