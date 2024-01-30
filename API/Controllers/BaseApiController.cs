using API.Extensions;
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

        // WITHOUT PAGINATION
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

        // WITH PAGINATION
        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            // Generating HTTP response based on the properties from the Handler
            if (result == null)
            {
                return NotFound(); // 404
            }

            if (result.IsSuccess && result.Value != null)
            {
                // Adding a Header with the pagination info to the Response;
                // {"currentPage":X,"itemsPerPage":X,"totalItems":X,"totalPages":X}
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize,
                    result.Value.TotalCount, result.Value.TotalPages);

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