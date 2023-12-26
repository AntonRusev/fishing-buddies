namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } // Using the Id from Cloudinary
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}