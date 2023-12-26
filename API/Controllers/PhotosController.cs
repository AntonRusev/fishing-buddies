using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        // Adding a Photo
        [HttpPost]
        public async Task<IActionResult> AddPhoto([FromForm] AddPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        // Deleting a Photo
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(string id)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }));
        }

        // Setting a photo to Main Photo
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
        }
    }
}