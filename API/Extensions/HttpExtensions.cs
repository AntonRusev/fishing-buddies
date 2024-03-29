using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new
            {
                currentPage,
                itemsPerPage,
                totalItems,
                totalPages
            };

            // Adding a Header with the pagination info and params to the Http Response 
            // {"currentPage":X,"itemsPerPage":X,"totalItems":X,"totalPages":X}
            response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader));
        }
    }
}