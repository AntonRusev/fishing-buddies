using Application.Events;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        // Get all Events => /api/events
        [HttpGet]
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await Mediator.Send(new List.Query());
        }

        // Get single Event by Id => /api/events/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        // Create an Event
        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event fishingEvent)
        {
            await Mediator.Send(new Create.Command { Event = fishingEvent });

            return Ok();
        }

        // Edit an Event
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event fishingEvent)
        {
            fishingEvent.Id = id;

            await Mediator.Send(new Edit.Command { Event = fishingEvent });

            return Ok();
        }

        // Delete an Event
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            await Mediator.Send(new Delete.Command { Id = id });

            return Ok();
        }
    }
}