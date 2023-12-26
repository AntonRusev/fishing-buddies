using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    // These do not touch the DB, they are only used for Cloudinary
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}