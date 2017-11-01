using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Controllers
{
    public class AuthViewModelTestController : ApiController
    {
        static bool lastvalid = false;
        // GET: api/AuthViewModelTest
        public bool Get()
        {
            return lastvalid;
        }

        // GET: api/AuthViewModelTest/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/AuthViewModelTest
        public void Post([FromBody]AuthViewModel value)
        {
            //lastvalid = value.isAuthentic;
            lastvalid = value.isAuthentic;
        }

        // PUT: api/AuthViewModelTest/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AuthViewModelTest/5
        public void Delete(int id)
        {
        }
    }
}
