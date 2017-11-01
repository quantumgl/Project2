using IndieWebGamesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;


namespace IndieWebGamesAPI.Controllers
{
    public class GamesController : ApiController
    {
        private IndieWebGamesAPIDbContext db = new IndieWebGamesAPIDbContext();
        //test data
        public static List<Games> currGames = new List<Games>
        { new Games { Id = 1,Name = "2048",Engine = 0,Author = "SomeGuy",AvailableLvls = 1,Rating = 8  },
        new Games { Id = 2,Name = "TicTacToe",Engine = 0,Author = "OtherGuy",AvailableLvls = 1,Rating = 7  }};

        private static List<UserStatus> loggedinusers = new List<UserStatus>{
         new UserStatus {  Name = "Mark", LastPing =
            DateTime.Now,gameStatus = 1},
         new UserStatus {  Name = "Joe", LastPing =
            DateTime.Now,gameStatus = 2},
      };
        //
        //api/Games
        //public List<Games> GetGameList(Games games)
        //{
        //    var results = currGames;

        //    return (results);
        //} 
        public List<Games> GetGameList(Games games)
        {
            var results = currGames;

            return (results);
        }

        //api/Games/{id}
        public List<UserStatus> GetGame(int id)
        {
           DateTime updated = DateTime.Now.Add(new TimeSpan(0, 0, -5));

            var usersInGame = loggedinusers.FindAll(current => ((current.LastPing <= DateTime.Now) && (current.LastPing > updated) && (current.gameStatus == id)));

            return (usersInGame);
        }
        // PUT: api/Games/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutGames(int id, Games games)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != games.Id)
            {
                return BadRequest();
            }

            db.Entry(games).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!GamesExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Games1
//        [ResponseType(typeof(Games))]
//        public IHttpActionResult PostGames(Games games)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }

//            db.Games.Add(games);
//            db.SaveChanges();

//            return CreatedAtRoute("DefaultApi", new { id = games.Id }, games);
//        }

//        DELETE: api/Games1/5
//        [ResponseType(typeof(Games))]
//        public IHttpActionResult DeleteGames(int id)
//        {
//            Games games = db.Games.Find(id);
//            if (games == null)
//            {
//                return NotFound();
//            }

//            db.Games.Remove(games);
//            db.SaveChanges();

//            return Ok(games);
//        }

//        protected override void Dispose(bool disposing)
//        {
//            if (disposing)
//            {
//                db.Dispose();
//            }
//            base.Dispose(disposing);
//        }

//        private bool GamesExists(int id)
//        {
//            return db.Games.Count(e => e.Id == id) > 0;
//        }
//    }
    }
}