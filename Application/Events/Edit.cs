using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var fishingEvent = await _context.Events.FindAsync(request.Event.Id);

                if (fishingEvent == null)
                {
                    return null;
                }

                // Saving the changes to the Event in-memory
                _mapper.Map(request.Event, fishingEvent);

                // Persisting the changes(with the newly edited Event) to the database
                var result = await _context.SaveChangesAsync() > 0;

                //SaveChangesAsync returns number of changes successfully written to the database
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to update activity");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}