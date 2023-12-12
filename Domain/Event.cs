namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Region { get; set; }
        public bool IsCancelled { get; set; }
        public ICollection<EventAttendee> Attendees { get; set; } = new List<EventAttendee>();
    }
}