using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<List<EventDto>>> { }
        public class Handler : IRequestHandler<Query, Result<List<EventDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<EventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Including the User and the Attendees from the join table in the response
                var events = await _context.Events
                    .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                // Comes from the custom Result class in Core
                return Result<List<EventDto>>.Success(events);
            }
        }
    }
}