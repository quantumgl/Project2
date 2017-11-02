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
        private static List<UserStatus> loggedinusers = new List<UserStatus>();


        //private Predicate<UserStatus> comparerer = new Predicate<UserStatus> { userstat => userstat}
        //private applicationDbContext context;
        // api/Users

        public List<UserStatus> GetCurrentUsers()
        {
            DateTime updated = DateTime.Now.Add(new TimeSpan(0, 0, -5));
        
            var users = loggedinusers.FindAll(current => ((current.LastPing <= DateTime.Now) && (current.LastPing > updated)));           

            return (users);
        }
        
        [HttpPost]
        // api/Users/{UserName}
        public void GetPingerUserName(AuthenticateUserStatus authUser)
        {

            if (authUser.authViewModel.isAuthentic)
            {
                var userVm = authUser.userStatus;
            var user = loggedinusers.Find(userstatus => userstatus.Name.Equals(userVm.Name));

            if (user == null)
            {
                loggedinusers.Add(new UserStatus {Name = userVm.Name, LastPing = DateTime.Now,codes = StatCodes.Online});
            }
            else
            {
                user.LastPing = DateTime.Now;
                user.codes = userVm.codes;
                    

            }
          }      
        }

    }

}
