using Domain;
using FluentValidation;

namespace Application.Events
{
    public class EventValidator : AbstractValidator<Event>
    {
        //Validating the Event for empty fields
        public EventValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Region).NotEmpty();
        }
    }
}