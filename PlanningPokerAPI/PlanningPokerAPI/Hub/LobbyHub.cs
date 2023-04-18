using Microsoft.AspNetCore.SignalR;
using PlanningPokerAPI.Data;
using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Hub
{
    public class LobbyHub : Microsoft.AspNetCore.SignalR.Hub
    {// test to build pipelines again.
        private readonly IDictionary<string, UserConnection> _connections;
        private readonly IConnectedUserRepository _connectedUserRepository;
        private readonly INotificationMessageRepository _notificationMessageRepository;
        private readonly IRoomRepository _roomRepository;

        public LobbyHub(IDictionary<string, UserConnection> connections, IConnectedUserRepository connectedUserRepository,
                             INotificationMessageRepository notificationMessageRepository,
                             IRoomRepository roomRepository)
        {
            _connections = connections;
            _connectedUserRepository = connectedUserRepository;
            _notificationMessageRepository = notificationMessageRepository;
            _roomRepository = roomRepository;
        }

       



        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);

                _connectedUserRepository.RemoveConnectedUser(Context.ConnectionId);

                SendConnectedUsers(userConnection.Room);
            }
            await base.OnDisconnectedAsync(exception);
        }

     
        public async Task JoinRoom(UserConnection userConnection)
        {
            
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            _connections[Context.ConnectionId] = userConnection;           
            _roomRepository.AddRoom(userConnection.Room);
            _connectedUserRepository.AddConnectedUser(userConnection, Context.ConnectionId);         

            await SendConnectedUsers(userConnection.Room);
        }

        public async Task UpdateVote(string username, string vote, bool votedStatus, string room)
        {
            _connectedUserRepository.UpdateVote(username, vote, votedStatus, room);
            await SendConnectedUsers(room);
        }

        public async Task CheckIfEveryoneVoted(string room)
        {
            string notification = _notificationMessageRepository.GetNotificationById(2).Message;
            if (_connectedUserRepository.CheckIfEveryoneVoted(room))
            {

                await Clients.Group(room).SendAsync("EveryoneVoted", true, notification);
            }
            else
            {
                await Clients.Group(room).SendAsync("EveryoneVoted", false, "");
            }
            await SendConnectedUsers(room);

        }

        public async Task FlipCards(bool flipCards, string room)
        {
            string notification = _notificationMessageRepository.GetNotificationById(3).Message;
            if (flipCards)
            {
                await Clients.Group(room).SendAsync("CardsFlipped", true, notification);
            }
            else
            {
                await Clients.Group(room).SendAsync("CardsFlipped", false, "");
            }
            await SendConnectedUsers(room);
        }

        public async Task FinishVoting(string room)
        {
            await FlipCards(false, room);
            _connectedUserRepository.CheckIfEveryoneVoted(room);
            bool votesCleared = _connectedUserRepository.ClearVotes();
            string notification = _notificationMessageRepository.GetNotificationById(5).Message;
            await Clients.Group(room).SendAsync("VotingFinished", votesCleared, notification);
            await SendConnectedUsers(room);
        }

        public async Task CardConfigurationNotification(string room)
        {
            await FlipCards(false, room);
            _connectedUserRepository.CheckIfEveryoneVoted(room);
            bool votesCleared = _connectedUserRepository.ClearVotes();
            string notification = _notificationMessageRepository.GetNotificationById(6).Message;
            await Clients.Group(room).SendAsync("CardConfigNotification", votesCleared, notification);
            await SendConnectedUsers(room);

        }

        public async Task ClearVotes(string room)
        {
            await FlipCards(false, room);
            _connectedUserRepository.CheckIfEveryoneVoted(room);
            bool votesCleared = _connectedUserRepository.ClearVotes();
            string notification = _notificationMessageRepository.GetNotificationById(4).Message;
            await Clients.Group(room).SendAsync("VotesCleared", votesCleared, notification);
            await SendConnectedUsers(room);

        }

        public async Task SendConnectedUsers(string room)
        {
            var users = _connections.Values.Select(c => c);
            await Clients.Groups(room).SendAsync("UsersInRoom", users);
        }
    }
}
