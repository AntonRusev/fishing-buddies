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
        public ICollection<UserFollowing> Followings { get; set; }
        public ICollection<UserFollowing> Followers { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    }
}