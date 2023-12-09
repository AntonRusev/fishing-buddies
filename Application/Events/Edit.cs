using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var fishingEvent = await _context.Events.FindAsync(request.Event.Id);

                _mapper.Map(request.Event, fishingEvent);

                await _context.SaveChangesAsync();
            }
        }
    }
}