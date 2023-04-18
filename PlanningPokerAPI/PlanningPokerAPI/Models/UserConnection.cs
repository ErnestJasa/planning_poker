namespace PlanningPokerAPI.Models
{
    public class UserConnection
    {
        public string Username { get; set; }
        public string Role { get; set; }
        public string Room { get; set; }
        public string Vote { get; set; }
        public bool Voted { get; set; }
    }
}
