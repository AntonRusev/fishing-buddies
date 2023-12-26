namespace Application.Photos
{
    // Returned as response from Cloudinary
    public class PhotoUploadResult
    {
        public string PublicId { get; set; }
        public string Url { get; set; }
    }
}