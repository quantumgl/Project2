using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

public enum Genres { Platformer, Puzzle, Strategy };

namespace IndieWebGamesAPI.Models
{
    public class IndiePlayerProfile
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int Level { get; set; }
        public Genres PreferredGenre { get; set; }
    }
}