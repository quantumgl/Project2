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
    public class LevelsController : ApiController
    {
        private IndieWebGamesAPIDbContext db = new IndieWebGamesAPIDbContext();

        // GET: api/Levels
        public IQueryable<Level> GetLevels()
        {
            return db.Levels;
        }

        // GET: api/Levels/5
        [ResponseType(typeof(Level))]
        public IHttpActionResult GetLevel(int id)
        {
            Level level = db.Levels.Find(id);
            if (level == null)
            {
                return NotFound();
            }

            return Ok(level);
        }

        // PUT: api/Levels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLevel(int id, Level level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != level.Id)
            {
                return BadRequest();
            }

            db.Entry(level).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LevelExists(id))
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

        // POST: api/Levels
        [ResponseType(typeof(Level))]
        public IHttpActionResult PostLevel(Level level)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Levels.Add(level);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = level.Id }, level);
        }

        // DELETE: api/Levels/5
        [ResponseType(typeof(Level))]
        public IHttpActionResult DeleteLevel(int id)
        {
            Level level = db.Levels.Find(id);
            if (level == null)
            {
                return NotFound();
            }

            db.Levels.Remove(level);
            db.SaveChanges();

            return Ok(level);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LevelExists(int id)
        {
            return db.Levels.Count(e => e.Id == id) > 0;
        }
    }
}