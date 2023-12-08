using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Event>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Event>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Events.FindAsync(request.Id);
            }
        }
    }
}