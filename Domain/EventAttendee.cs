namespace Domain
{
    public class EventAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid EventId { get; set; }
        public Event Event { get; set; }
        public bool IsHost { get; set; }
    }
}