using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> AddPhoto([FromForm] AddPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }
    }
}