using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest
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
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                // Adding the Event in-memory
                _context.Events.Add(request.Event);

                // Persisting the changes(with the newly added Event) to the database
                await _context.SaveChangesAsync();
            }
        }
    }
}