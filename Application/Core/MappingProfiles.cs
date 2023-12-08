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
        }
    }
}