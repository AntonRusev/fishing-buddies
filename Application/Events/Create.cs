using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Adding the Event in-memory
                _context.Events.Add(request.Event);

                // Persisting the changes(with the newly added Event) to the database
                var result = await _context.SaveChangesAsync() > 0;

                //SaveChangesAsync returns number of changes successfully written to the database
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create activity");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}