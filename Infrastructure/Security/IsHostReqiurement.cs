using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostReqiurement : IAuthorizationRequirement
    {
        
    }
    public class IsHostReqiurementHandler : AuthorizationHandler<IsHostReqiurement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;

        public IsHostReqiurementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }
        protected override Task HandleRequirementAsync (AuthorizationHandlerContext context, IsHostReqiurement requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUsername = _httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var activityId = Guid.Parse(authContext.RouteData.Values["Id"].ToString());

                var activity = _context.Activities.FindAsync(activityId).Result;

                var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

                if(host?.AppUser?.UserName == currentUsername) 
                context.Succeed(requirement);
            }
            else{
                context.Fail();
            }


            return Task.CompletedTask;
        }
    }
}