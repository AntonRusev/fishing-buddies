using Application.Comments;
using Application.Events;
using Application.Profiles;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            // Mapping from the Event passed as a parameter to the already existing Event in the data context
            CreateMap<Event, Event>();
            CreateMap<Event, EventDto>()
                .ForMember(d => d.HostUsername, opt => opt.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName)); // Setting up Host for the Event
            CreateMap<EventAttendee, AttendeeDto>()
                .ForMember(u => u.Username, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(u => u.Bio, opt => opt.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos
                    .FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers
                    .Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos
                    .FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers
                    .Any(x => x.Observer.UserName == currentUsername)));
            CreateMap<Comment, CommentDto>()
                .ForMember(u => u.Username, opt => opt.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos
                    .FirstOrDefault(x => x.IsMain).Url));
            CreateMap<EventAttendee, UserEventDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Event.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Event.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Event.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Event.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Event.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
        }
    }
}