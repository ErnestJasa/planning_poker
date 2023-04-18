using System.ComponentModel.DataAnnotations;

namespace PlanningPokerAPI.Models
{
    public class RoomCardConfig
    {
        [Key]
        public string ConfigRoom { get; set; }
        public string Value { get; set; }
    }
}
