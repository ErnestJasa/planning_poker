using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlanningPokerAPI.Interfaces;

namespace PlanningPokerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationMessageController : ControllerBase
    {
        private readonly INotificationMessageRepository _notificationMessageRepository;
        public NotificationMessageController(INotificationMessageRepository notificationMessageRepository)
        {
            _notificationMessageRepository = notificationMessageRepository;
        }

        [HttpGet("getNotificationById/{id}")]
        public IActionResult GetNotificationById(int id)
        {
            var notification = _notificationMessageRepository.GetNotificationById(id);

            if (notification != null)
            {
                return Ok(notification);
            }

            return NotFound();
        }

        [HttpGet("getAllNotifications")]
        public IActionResult GetAllNotifications()
        {
            var notifications = _notificationMessageRepository.GetAllNotifications();
            if (notifications != null)
            {
                return Ok(notifications);
            }
            return NotFound();
        }
    }
}
