using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using IndieWebGamesAPI.Models;
using System.ComponentModel;

namespace IndieWebGamesAPI.Controllers
{
    public class UsersController : ApiController
    {
        private static List<UserStatus> loggedinusers;

        //private Predicate<UserStatus> comparerer = new Predicate<UserStatus> { userstat => userstat}
        private applicationDbContext context;
        // api/Users

        public UserStatus GetCurrentUsers()
        {
            
            DateTime updated = DateTime.Now.Add(new TimeSpan(0, 0, -2));
         
            var users = loggedinusers.Find(current => (current.LastPing <= DateTime.Now) && (current.LastPing > updated));

            return (users);
        }
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
