using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Repository
{
    public class NotificationMessageRepository : INotificationMessageRepository
    {
        public readonly DataContext _context;
        public NotificationMessageRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<NotificationMessage> GetAllNotifications()
        {
            return _context.NotificationMessages;
        }

        public NotificationMessage GetNotificationById(int id)
        {
            var notificationMessage = _context.NotificationMessages.FirstOrDefault(x => x.Id == id);
            return notificationMessage;
        }
    }
}
