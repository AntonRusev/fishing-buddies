using Application.Core;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var fishingEvent = await _context.Events.FindAsync(request.Id);

                if (fishingEvent == null)
                {
                    return null;
                }

                // Removing the Event in-memory
                _context.Remove(fishingEvent);

                // Removing the Event from the database
                var result = await _context.SaveChangesAsync() > 0;

                //SaveChangesAsync returns number of changes successfully written to the database
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to delete event");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}