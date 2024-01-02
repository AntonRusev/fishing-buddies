using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseApiController
    {
        // Get all Events => /api/events
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            // Generating a HTTP response in the BaseApiController & True for all instances below
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        // Get single Event by Id => /api/events/:id
        [AllowAnonymous]
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
        [Authorize(Policy = "IsEventHost")] // Only the Host of the Event can Edit it
        [HttpPut("{id}")]
        public async Task<IActionResult> EditEvent(Guid id, Event fishingEvent)
        {
            fishingEvent.Id = id;

            return HandleResult(await Mediator.Send(new Edit.Command { Event = fishingEvent }));
        }

        // Delete an Event
        [Authorize(Policy = "IsEventHost")] // Only the Host of the Event can Delete it
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