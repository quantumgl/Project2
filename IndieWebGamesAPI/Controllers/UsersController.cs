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
       
        //private static List<UserStatus> loggedinusers;
        private static List<UserStatus> loggedinusers = new List<UserStatus>{
         new UserStatus {  Name = "Mark", LastPing =
            DateTime.Now},
         new UserStatus {  Name = "Joe", LastPing =
            DateTime.Now },
      };


        //private Predicate<UserStatus> comparerer = new Predicate<UserStatus> { userstat => userstat}
        private applicationDbContext context;
        // api/Users

        public IList<UserStatus> GetCurrentUsers()
        {
            
            DateTime updated = DateTime.Now.Add(new TimeSpan(0, 0, -2));
        
            var users = loggedinusers.FindAll(current => ((current.LastPing <= DateTime.Now) && (current.LastPing > updated)));
            

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
