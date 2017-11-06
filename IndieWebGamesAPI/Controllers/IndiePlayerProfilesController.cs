using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Controllers
{
    public class IndiePlayerProfilesController : ApiController
    {
        private IndieWebGamesAPIDbContext db = new IndieWebGamesAPIDbContext();

        // GET: api/IndiePlayerProfiles
        public IEnumerable<IndiePlayerProfile> GetIndiePlayerProfiles()        {
            return db.IndiePlayerProfiles.ToList();
        }

        // GET: api/IndiePlayerProfiles/5
        [ResponseType(typeof(IndiePlayerProfile))]
        public IHttpActionResult GetIndiePlayerProfile(string Username)
        {
            var list = db.IndiePlayerProfiles.Where(p => p.Username == Username).ToList();
            //IndiePlayerProfile indiePlayerProfile = await db.IndiePlayerProfiles.FindAsync(Username);
            if (list.Count == 0)
                return NotFound();
            
            return Ok(list[0]);
        }

        // PUT: api/IndiePlayerProfiles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutIndiePlayerProfile(int id, IndiePlayerProfile indiePlayerProfile)
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
                await db.SaveChangesAsync();
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
        public IHttpActionResult PostIndiePlayerProfile(AuthIndiePlayerProfile authIndiePlayerProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (authIndiePlayerProfile.authViewModel.isAuthentic)
            {
                var profile = authIndiePlayerProfile.indiePlayerProfile;
                db.IndiePlayerProfiles.Add(profile);
                db.SaveChanges();
                return Ok(authIndiePlayerProfile.indiePlayerProfile);
            }
            else
            {
                return NotFound();
            }

            
        }

        // DELETE: api/IndiePlayerProfiles/5
        [ResponseType(typeof(IndiePlayerProfile))]
        public async Task<IHttpActionResult> DeleteIndiePlayerProfile(int id)
        {
            IndiePlayerProfile indiePlayerProfile = await db.IndiePlayerProfiles.FindAsync(id);
            if (indiePlayerProfile == null)
            {
                return NotFound();
            }

            db.IndiePlayerProfiles.Remove(indiePlayerProfile);
            await db.SaveChangesAsync();

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