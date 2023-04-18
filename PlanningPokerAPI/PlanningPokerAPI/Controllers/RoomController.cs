using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlanningPokerAPI.Interfaces;

namespace PlanningPokerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _roomRepository;
        public RoomController(IRoomRepository roomRepository)
        {
            _roomRepository = roomRepository;
        }
        [HttpGet("{roomName}")]
        public IActionResult UsersInRoom(string roomName)
        {
            var users = _roomRepository.GetUsersInRoom(roomName);
            if(users != null)
            {
                return Ok(users);
            }
            return NotFound();
        }
    }
}
