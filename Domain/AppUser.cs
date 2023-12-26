using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        // Listing only extra properties that we want to add,
        // that are not derived from IdentityUser class, such as Username, Email, Password etc...
        public string Bio { get; set; }
        public ICollection<EventAttendee> Events { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}