using PlanningPokerAPI.Data;
using PlanningPokerAPI.Models;
using PlanningPokerAPI.Interfaces;

namespace PlanningPokerAPI.Repository
{
    public class ConnectedUserRepository : IConnectedUserRepository
    {
        private readonly DataContext _context;
        private readonly IRoomRepository _roomRepository;
        public ConnectedUserRepository(DataContext context, IRoomRepository roomRepository)
        {
            _context = context;
            _roomRepository = roomRepository;
        }

        public ConnectedUser AddConnectedUser(UserConnection userConnection, string connectionId)
        {
            ConnectedUser connectedUser = new ConnectedUser()
            {
                Id = connectionId,
                Username = userConnection.Username,
                Role = userConnection.Role,
                RoomId = userConnection.Room,
                Vote = userConnection.Vote,
                Voted = userConnection.Voted,
            };
            if (_context.ConnectedUsers.FirstOrDefault(x => x.Username == connectedUser.Username && x.RoomId == connectedUser.RoomId) == null)
            {
                _context.ConnectedUsers.Add(connectedUser);
                _context.SaveChanges();
                return connectedUser;
            }
            return null;
        }

        public IEnumerable<ConnectedUser> GetConnectedUsers()
        {
            var connectedUsers = _context.ConnectedUsers;
            return connectedUsers;
        }

        public ConnectedUser RemoveConnectedUser(string connectionId)
        {
            var connectedUser = _context.ConnectedUsers.FirstOrDefault(u => u.Id == connectionId);
            _context.ConnectedUsers.Remove(connectedUser);
            _context.SaveChanges();
            return connectedUser;
        }

        public ConnectedUser UpdateVote(string username, string vote, bool voted, string roomName)
        {
            var connecteUser = _context.ConnectedUsers.SingleOrDefault(u => u.Username == username && u.RoomId == roomName);
            if (connecteUser != null)
            {
                connecteUser.Vote = vote;
                connecteUser.Voted = voted;
                _context.SaveChanges();
                return connecteUser;
            }
            return null;
        }

        public bool CheckIfEveryoneVoted(string roomName)
        {
            bool everyoneVoted = false;

            var connectedUsers = _roomRepository.GetUsersInRoom(roomName).ConnectedUsers;
            int connectedGuestUsersCount = GetConnectedGuestUserCount(connectedUsers);
            if(connectedGuestUsersCount != 0)
            {
                if (connectedGuestUsersCount == GetVotedUserCount(connectedUsers))
                {
                    everyoneVoted = true;
                    return everyoneVoted;
                }
            }
            return everyoneVoted;
        }

        public bool ClearVotes()
        {
            var connectedUsers = GetConnectedUsers();
            foreach (var user in connectedUsers)
            {
                user.Vote = "?";
                user.Voted = false;
            }
            _context.SaveChanges();
            bool allCleared = connectedUsers.All(x => x.Voted == false);
            return allCleared;
        }
        internal int GetConnectedGuestUserCount(IEnumerable<ConnectedUser> connectedUsers)
        {
            int guestUserCount = 0;

            if (connectedUsers != null)
            {
                foreach (var connectedUser in connectedUsers)
                {
                    if (connectedUser.Role == "guest")
                    {
                        guestUserCount++;
                    }
                }
            }
            return guestUserCount;
        }
        internal int GetVotedUserCount(IEnumerable<ConnectedUser> connectedUsers)
        {
            int votedUserCount = 0;

            if (connectedUsers != null)
            {
                foreach (var connectedUser in connectedUsers)
                {
                    if (connectedUser.Voted && connectedUser.Role == "guest")
                    {
                        votedUserCount++;
                    }
                }
            }
            return votedUserCount;
        }
    }
}
