using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<EventDto>>>
        {
            public EventParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<EventDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // The query is not being executed, it is being defered until a PagedList is created
                // Including the User and the Attendees from the join table in the response
                var query = _context.Events
                    .Where(d => d.Date >= request.Params.StartDate) // Select only entries AFTER(or including) the selected date
                    .OrderBy(d => d.Date)
                    .ProjectTo<EventDto>(_mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() }) // Setting currentUsername in MappingProfiles
                    .AsQueryable(); // Defering

                // Show only Events that the logged-in User is attending
                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees
                        .Any(a => a.Username == _userAccessor.GetUsername()));
                }

                // Show only Events that the logged-in User is Hosting(Owner)
                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(x => x.HostUsername == _userAccessor.GetUsername());
                }

                // "Result" comes from the custom Result class in Core
                // The PagedList of Events includes properties such as:
                // current page, total pages, page size, total count
                return Result<PagedList<EventDto>>.Success(
                    // "CreateAsync" method comes from the PagedList class
                    await PagedList<EventDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}