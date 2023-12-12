using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Event Event { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // Using the custom EventValidator 
                RuleFor(x => x.Event).SetValidator(new EventValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                // Setting the User creating the Event as a Host in the table
                var attendee = new EventAttendee
                {
                    AppUser = user,
                    Event = request.Event,
                    IsHost = true,
                };

                // Adding the User in the list of attendees
                request.Event.Attendees.Add(attendee);

                // Adding the Event in-memory
                _context.Events.Add(request.Event);

                // Persisting the changes(with the newly added Event) to the database
                var result = await _context.SaveChangesAsync() > 0;

                //SaveChangesAsync returns number of changes successfully written to the database
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create event");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}