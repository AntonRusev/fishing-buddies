namespace Application.Events
{
    public class AttendeeDto
    {
        public string Username { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public bool Following { get; set; } // If the currently logged user is following the viewed user
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}