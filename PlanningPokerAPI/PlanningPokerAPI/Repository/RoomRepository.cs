using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _dataContext;
        public RoomRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void AddRoom(string roomName)
        {
            var room = _dataContext.Rooms.FirstOrDefault(x=> x.RoomId == roomName);
            if(room != null)
            {
                room.LastUsed = DateTime.Now;
                _dataContext.SaveChanges();
            }
            else
            {
                Room newRoom = new Room()
                {
                    RoomId = roomName,
                    LastUsed = DateTime.Now,
                };
                _dataContext.Rooms.Add(newRoom);
                _dataContext.SaveChanges();
            }
        }

        public Room GetUsersInRoom(string roomName)
        {
            var room = _dataContext.Rooms.Include("ConnectedUsers").FirstOrDefault(x=> x.RoomId == roomName);
            return room;
        }
    }
}
