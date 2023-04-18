using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Interfaces
{
    public interface IConnectedUserRepository
    {
        public IEnumerable<ConnectedUser> GetConnectedUsers();
        public ConnectedUser AddConnectedUser(UserConnection userConnection, string connectionId);
        public ConnectedUser RemoveConnectedUser(string username);
        public ConnectedUser UpdateVote(string username, string vote, bool voted, string roomName);
        public bool CheckIfEveryoneVoted(string roomName);
        public bool ClearVotes();
    }
}
