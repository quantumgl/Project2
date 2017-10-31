using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Controllers
{
    public class IndiePlayerProfilesController : ApiController
    {
        private IndieWebGamesAPIDbContext db    = new IndieWebGamesAPIDbContext();

        // GET: api/IndiePlayerProfiles
        public IEnumerable<IndiePlayerProfile> GetIndiePlayerProfiles()
        {
            IndiePlayerProfile profile1         = new IndiePlayerProfile { Id = 0, UserName = "Andres", Level = 0, PreferredGenre = Genres.Platformer };
            List<IndiePlayerProfile> samplelist = new List<IndiePlayerProfile>();

            samplelist.Add(profile1);

            return samplelist;//db.IndiePlayerProfiles;
        }

        // GET: api/IndiePlayerProfiles/5
        [ResponseType(typeof(IndiePlayerProfile))]
        public IHttpActionResult GetIndiePlayerProfile(string username)
        {
            IndiePlayerProfile indiePlayerProfile = db.IndiePlayerProfiles.Find(profile => profile.UserName == username);
            if (indiePlayerProfile == null)
            {
                return NotFound();
            }

            return Ok(indiePlayerProfile);
        }

        // PUT: api/IndiePlayerProfiles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIndiePlayerProfile(int id, IndiePlayerProfile indiePlayerProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != indiePlayerProfile.Id)
            {
                return BadRequest();
            }

            db.Entry(indiePlayerProfile).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndiePlayerProfileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/IndiePlayerProfiles
        [ResponseType(typeof(IndiePlayerProfile))]
        public IHttpActionResult PostIndiePlayerProfile(IndiePlayerProfile indiePlayerProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.IndiePlayerProfiles.Add(indiePlayerProfile);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = indiePlayerProfile.Id }, indiePlayerProfile);
        }

        // DELETE: api/IndiePlayerProfiles/5
        [ResponseType(typeof(IndiePlayerProfile))]
        public IHttpActionResult DeleteIndiePlayerProfile(string username)
        {
            IndiePlayerProfile indiePlayerProfile = db.IndiePlayerProfiles.Find(profile => profile.UserName == username);
            if (indiePlayerProfile == null)
            {
                return NotFound();
            }

            db.IndiePlayerProfiles.Remove(indiePlayerProfile);
            db.SaveChanges();

            return Ok(indiePlayerProfile);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IndiePlayerProfileExists(int id)
        {
            return db.IndiePlayerProfiles.Count(e => e.Id == id) > 0;
        }
    }
}