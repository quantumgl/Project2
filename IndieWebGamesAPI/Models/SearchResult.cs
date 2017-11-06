using System.Linq;
using IndieWebGamesAPI.Models;
using System.Collections.Generic;

namespace IndieWebGamesAPI.Controllers
{
    public class SearchResult
    {
        public List<IndiePlayerProfile> indiePlayerProfile;
        public List<Level> level;
    }
}