using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var fishingEvent = await _context.Events
                    .Include(a => a.Attendees)
                    .ThenInclude(u => u.AppUser)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                if (fishingEvent == null)
                {
                    return null;
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null)
                {
                    return null;
                }

                // Getting the Host of the Event
                var hostUsername = fishingEvent.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                // Checking if the current User is in the Attendees list
                var attendance = fishingEvent.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // Toggle "Activate/Cancel Event" if the current User is Host of the Event
                if (attendance != null && hostUsername == user.UserName)
                {
                    fishingEvent.IsCancelled = !fishingEvent.IsCancelled;
                }

                // If current User is in Attendees and is not Host, remove current User from Attendees
                if (attendance != null && hostUsername != user.UserName)
                {
                    fishingEvent.Attendees.Remove(attendance);
                }

                // Add current User to Attendees
                if (attendance == null)
                {
                    attendance = new EventAttendee
                    {
                        AppUser = user,
                        Event = fishingEvent,
                        IsHost = false
                    };

                    fishingEvent.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}