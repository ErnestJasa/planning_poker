using Microsoft.EntityFrameworkCore;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Data
{
    public class DataContext : DbContext
    {//test
        public DataContext(DbContextOptions<DataContext> options):base(options) 
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<GuestUser> GuestUsers { get; set; }
        public DbSet<ConnectedUser> ConnectedUsers { get; set; }
        public DbSet<CardConfig> ConfigTable { get; set; }
        public DbSet<CardClear> CardClearTable { get; set; }
        public DbSet<RoomCardClear> RoomCardClearTable { get; set; }
        public DbSet<RoomCardConfig> RoomConfigTable { get; set; }
        public DbSet<NotificationMessage> NotificationMessages { get; set; }
        public DbSet<Room> Rooms { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });
            modelBuilder.Entity<NotificationMessage>().HasData(new List<NotificationMessage> {
               new NotificationMessage{ Id = 1, Message = "Voting starts.", NotificationFor = "Waiting for votes" },
               new NotificationMessage{ Id = 2, Message = "Voting stopped.", NotificationFor = "All players made their votes"},
               new NotificationMessage{ Id = 3, Message = "Moderator flipped the cards. Voting stopped.", NotificationFor = "Moderator pressed \"Flip cards\""},
               new NotificationMessage{ Id = 4, Message = "Votes are cleared by the moderator. Voting re-started.", NotificationFor = "Moderator clears the votes"},
               new NotificationMessage{ Id = 5, Message = "Voting finished.", NotificationFor = "Moderator press \"Finish voting\""},
               new NotificationMessage{ Id = 6, Message = "New voting values saved. Voting session re-started.", NotificationFor = "Moderator saves new voting values selection"},
            });
        }
    }
}
