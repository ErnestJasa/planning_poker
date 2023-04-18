using System.ComponentModel.DataAnnotations;

namespace PlanningPokerAPI.Models
{
    public class Room
    {
        [Key]
        public string RoomId { get; set; }
        public DateTime LastUsed { get; set; }
        public ICollection<ConnectedUser> ConnectedUsers { get; set; }
    }
}
