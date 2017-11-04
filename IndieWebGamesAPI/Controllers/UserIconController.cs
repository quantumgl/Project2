using IndieWebGamesAPI.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace IndieWebGamesAPI.Controllers
{
    public class UserIconController : ApiController
    {
        IndieWebGamesAPIDbContext db = new IndieWebGamesAPIDbContext();

        //static List<UserIcon> iconlist = new List<UserIcon>();
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(string Username)
        {
            
            var result = db.UserIcons.Where(uc => uc.Username == Username).ToList();

            return result.Count == 0? "": result[0].Blob;
        }

        // POST api/<controller>
        public void Post([FromBody]AuthUserIcon authUserIcon)
        {
            if (authUserIcon.authViewModel.isAuthentic)
            {
                db.UserIcons.Add(authUserIcon.userIcon);
                db.SaveChanges();
            }
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}