using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            // For pagination, two queries are made to the database

            // 1: Get the count of ALL items before pagination has taken place
            var count = await source.CountAsync(); 

            // 2: Get the paginated entries, based on the requirements

            // For instance: There is 12 Event entries in the DB;
            // For the first page we take the pageNumber(1) and subtract 1, resulting 0,
            // 0 * pageSize(10) is still 0, so we skip 0 entries and return pageSize(10) results(1-10);
            // For the second page we have pageNumber(2) and subtract 1, resulting 1,
            // 1 * pageSize(10) is 10, so we skip the first 10 entries and return pageSize(10) results(11-20);

            var items = await source.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}