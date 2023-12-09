using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator =>
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            // Generating HTTP response based on the properties from the Handler
            if (result == null)
            {
                return NotFound(); // 404
            }
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value); // 200
            }
            if (result.IsSuccess && result.Value == null)
            {
                return NotFound(); // 404
            }
            return BadRequest(result.Error); // 400
        }
    }
}