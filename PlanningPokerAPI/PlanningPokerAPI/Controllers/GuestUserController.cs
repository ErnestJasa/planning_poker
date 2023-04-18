using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlanningPokerAPI.Interfaces;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestUserController : ControllerBase       
    {
        private readonly IGuestUserRepository _GuestUserRepository;
        public GuestUserController(IGuestUserRepository userRepository)
        {
            _GuestUserRepository = userRepository;
        }

        [HttpPost("login")]
        public IActionResult Login(GuestUser guestUser)
        {
            var user = _GuestUserRepository.Create(guestUser);
            if(user == null)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpPost("logout")]
        public IActionResult Logout(string name)
        {
            var user = _GuestUserRepository.Delete(name);
            if (!user)
            {
                return BadRequest();
            }
            return Ok(new { message = "Success" });
        }
    }
}
