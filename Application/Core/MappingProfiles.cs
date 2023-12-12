using Application.Events;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Mapping from the Event passed as a parameter to the already existing Event in the data context
            CreateMap<Event, Event>();
            CreateMap<Event, EventDto>()
                .ForMember(d => d.HostUsername, opt => opt.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName)); // Setting up Host for the Event
            CreateMap<EventAttendee, Profiles.Profile>()
                .ForMember(u => u.Username, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(u => u.Bio, opt => opt.MapFrom(s => s.AppUser.Bio));
        }
    }
}