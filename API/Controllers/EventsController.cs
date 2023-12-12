using Application.Events;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        // Get all Events => /api/events
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            // Generating a HTTP response in the BaseApiController & True for all instances below
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        // Get single Event by Id => /api/events/:id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        // Create an Event
        [HttpPost]
        public async Task<IActionResult> CreateEvent(Event fishingEvent)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Event = fishingEvent }));
        }

        // Edit an Event
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event fishingEvent)
        {
            fishingEvent.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { Event = fishingEvent }));
        }

        // Delete an Event
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        // Update attendance to an Event
        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}