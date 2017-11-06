using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Controllers
{
    public class SearchResultController : ApiController
    {
        private IndieWebGamesAPIDbContext db = new IndieWebGamesAPIDbContext();

        public SearchResult GetSearchResult(string search)
        {
            // var searchResult = new SearchResult();
            
            return new SearchResult { indiePlayerProfile = db.IndiePlayerProfiles.Where(r => r.Username.StartsWith(search) || r.Bio.Contains("#" + search)).ToList(),level = db.Levels.Where(lvl => lvl.LevelName.Contains(search) || lvl.Creator.Username.StartsWith(search)).ToList() };

        }
    }
}