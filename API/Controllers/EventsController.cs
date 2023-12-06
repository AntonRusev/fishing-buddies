using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class EventsController(DataContext context) : BaseApiController
    {
        private readonly DataContext _context = context;

        // Get all Events => /api/events
        [HttpGet] 
        public async Task<ActionResult<List<Event>>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }

        // Get single Event by Id => /api/events/:id
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(Guid id) 
        {
            return await _context.Events.FindAsync(id);
        }
    }
}