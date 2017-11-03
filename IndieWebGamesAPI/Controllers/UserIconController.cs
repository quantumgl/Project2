using IndieWebGamesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IndieWebGamesAPI.Controllers
{
    public class UserIconController : ApiController
    {
        List<UserIcon> iconlist = new List<UserIcon>();
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public byte[] Get(string Username)
        {
            return iconlist.Find(uc => uc.Username == Username).Blob;
        }

        // POST api/<controller>
        public void Post([FromBody]AuthUserIcon authUserIcon)
        {
            if (authUserIcon.authViewModel.isAuthentic)
            {
                iconlist.Add(authUserIcon.userIcon);
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