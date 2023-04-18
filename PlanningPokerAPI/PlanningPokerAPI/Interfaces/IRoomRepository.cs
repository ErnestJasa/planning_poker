using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Interfaces
{
    public interface IRoomRepository
    {
        public void AddRoom(string roomName);
        public Room GetUsersInRoom(string roomName);
    }
}
