using System.Linq;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Controllers
{
    public class SearchResult
    {
        public System.Linq.IQueryable<IndiePlayerProfile> indiePlayerProfile;
    }
}