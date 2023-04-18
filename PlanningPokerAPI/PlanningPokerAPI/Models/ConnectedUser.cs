using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlanningPokerAPI.Models
{
    public class ConnectedUser
    {
        [Key]
        public string Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        [ForeignKey("RoomId")]
        public string RoomId { get; set; }
        public string Vote { get; set; }
        public bool Voted { get; set; }
    }
}
