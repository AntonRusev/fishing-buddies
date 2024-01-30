using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<EventDto>>>
        {
            public PagingParams Params { get; set; }
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
                // We are not executing the query, we are defering it until we create a PagedList
                // Including the User and the Attendees from the join table in the response
                var query = _context.Events
                    .OrderBy(d => d.Date) // Order by date
                    .ProjectTo<EventDto>(_mapper.ConfigurationProvider,
                        new { currentUsername = _userAccessor.GetUsername() }) // Setting currentUsername in MappingProfiles
                    .AsQueryable(); // Defering

                // "Result" comes from the custom Result class in Core
                // The PagedList of Events includes properties such as:
                // current page, total pages, total count
                return Result<PagedList<EventDto>>.Success(
                    // "CreateAsync" method comes from the PagedList class
                    await PagedList<EventDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize) 
                );
            }
        }
    }
}