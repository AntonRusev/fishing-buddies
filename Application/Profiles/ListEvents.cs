using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListEvents
    {
        public class Query : IRequest<Result<List<UserEventDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserEventDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<List<UserEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Get the username by the query param and parse the Events 
                // through the UserEventDto in order to get only the required parameters
                var query = _context.EventAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Event.Date)
                    .ProjectTo<UserEventDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                // Get past or future events, or events hosted, by a particular user
                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now) // Default case is always "future"
                };

                var events = await query.ToListAsync();

                return Result<List<UserEventDto>>.Success(events);
            }
        }
    }
}