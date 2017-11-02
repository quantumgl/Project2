using IndieWebGamesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace IndieWebGamesAPI.Controllers
{
    public class UserStatusController : ApiController
    {
        
        // GET: api/UserStatus
        public List<string> GetStatusCodeList()
        {
            return (Enum.GetValues(typeof(StatCodes)).Cast<StatCodes>().Select(v => v.ToString()).ToList());
        }

        // GET: api/UserStatus/5
        public HttpResponseMessage PostValidateUserStatus(AuthenticateUserStatus data)
        {
            if (ModelState.IsValid)
            {
                if (data.userStatus.Name==data.authViewModel.name)
                {
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                return new HttpResponseMessage(HttpStatusCode.NotFound);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // POST: api/UserStatus
        public HttpResponseMessage Post(AuthViewModel data, [FromBody]AuthViewModel valData)
        {
            if (ModelState.IsValid)
            {
              if(data == valData)
                {
                    return new HttpResponseMessage(HttpStatusCode.OK); 
                }
                    
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // PUT: api/UserStatus/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/UserStatus/5
        public void Delete(int id)
        {
        }
    }
}
