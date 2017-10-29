using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IndieWebGamesAPI.Models;

namespace IndieWebGamesAPI.Controllers
{
    public class UsersController : ApiController
    {
        private static List<UserStatus> loggedinusers;

        //private Predicate<UserStatus> comparerer = new Predicate<UserStatus> { userstat => userstat}
        private applicationDbContext context;
        // api/Users

        // api/Users/{UserName}
        public void GetPingerUserName(string UserName, UserStatus users)
        {
            var user = loggedinusers.Find(userstatus => userstatus.Name.Equals(UserName));

            if (user == null)
            {
                loggedinusers.Add(new UserStatus {Name = UserName, LastPing = DateTime.Now});
            }
            else
            {
                user.LastPing = DateTime.Now;

            }
               
          
        }

    }

}
