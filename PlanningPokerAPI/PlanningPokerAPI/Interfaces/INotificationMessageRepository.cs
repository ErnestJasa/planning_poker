using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Interfaces
{
    public interface INotificationMessageRepository
    {
        public NotificationMessage GetNotificationById(int id);
        public IEnumerable<NotificationMessage> GetAllNotifications();
    }
}
