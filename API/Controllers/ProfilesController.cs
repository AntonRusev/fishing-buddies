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
    }
}