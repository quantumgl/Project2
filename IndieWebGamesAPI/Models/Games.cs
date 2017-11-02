using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IndieWebGamesAPI.Models
{
    
        public class Games
        {
            [Required]
            public int Id { get; set; }
            public string Name { get; set; }
            public int Engine { get; set; }
            public string Author { get; set; }
            public int AvailableLvls { get; set; }
            public decimal Rating { get; set; }
            //public int Assets { get; set; }

        }

    
}