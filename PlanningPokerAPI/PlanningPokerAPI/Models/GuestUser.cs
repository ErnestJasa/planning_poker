using System.ComponentModel.DataAnnotations;

namespace PlanningPokerAPI.Models
{
    public class GuestUser
    {

        public int Id { get; set; }
        [MaxLength(25)]
        public string Name { get; set; }  
    }
}
