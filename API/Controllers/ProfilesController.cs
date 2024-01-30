using Application.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            // Using Details from Application/Profiles
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        // Get Events of any given User by Predicate(future, past, hosting) - Default case is always "future"!
        [AllowAnonymous]
        [HttpGet("{username}/events")]
        public async Task<IActionResult> GetUserEvents(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListEvents.Query { Username = username, Predicate = predicate }));
        }
    }
}