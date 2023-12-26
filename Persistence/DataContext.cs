using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<EventAttendee> EventAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }

        // Manually creating the Join Table for Event Attendees
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Forming the Primary key for the table from the Ids of User and Event
            builder.Entity<EventAttendee>(x => x.HasKey(ea => new { ea.AppUserId, ea.EventId }));

            // Building the many to many relationship
            builder.Entity<EventAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(e => e.Events)
                .HasForeignKey(ea => ea.AppUserId);

            builder.Entity<EventAttendee>()
                .HasOne(u => u.Event)
                .WithMany(e => e.Attendees)
                .HasForeignKey(ea => ea.EventId);
        }
    }
}