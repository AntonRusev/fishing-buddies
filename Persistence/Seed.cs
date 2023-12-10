using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            // Seeding Users to the database
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{UserName = "anton", Email = "anton@test.com"},
                    new AppUser{UserName = "elena", Email = "elena@test.com"},
                    new AppUser{UserName = "jack", Email = "jack@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            // Seeding Events to the database
            if (context.Events.Any()) return;

            var events = new List<Event>
            {
                new Event
                {
                    Title = "Past Fishing Event 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Event 2 months ago",
                    Category = "calm-freshwater",
                    Region = "Plovdiv",
                },
                new Event
                {
                    Title = "Past Fishing Event 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Event 1 month ago",
                    Category = "saltwater",
                    Region = "Varna",
                },
                new Event
                {
                    Title = "Future Fishing Event 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Event 1 month in future",
                    Category = "flowing-freshwater",
                    Region = "Ruse",
                },
                new Event
                {
                    Title = "Future Fishing Event 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Event 2 months in future",
                    Category = "calm-freshwater",
                    Region = "Stara Zagora",
                },
                new Event
                {
                    Title = "Future Fishing Event 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Event 3 months in future",
                    Category = "flowing-freshwater",
                    Region = "Stara Zagora",
                },
                new Event
                {
                    Title = "Future Fishing Event 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Event 4 months in future",
                    Category = "flowing-freshwater",
                    Region = "Plovdiv",
                },
                new Event
                {
                    Title = "Future Fishing Event 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Event 5 months in future",
                    Category = "saltwater",
                    Region = "Varna",
                },
                new Event
                {
                    Title = "Future Fishing Event 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Event 6 months in future",
                    Category = "saltwater",
                    Region = "Burgas",
                },
                new Event
                {
                    Title = "Future Fishing Event 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Event 2 months ago",
                    Category = "flowing-freshwater",
                    Region = "Varna",
                },
                new Event
                {
                    Title = "Future Fishing Event 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Event 8 months in future",
                    Category = "flowing-freshwater",
                    Region = "Vidin",
                }
            };

            await context.Events.AddRangeAsync(events);
            await context.SaveChangesAsync();
        }
    }
}