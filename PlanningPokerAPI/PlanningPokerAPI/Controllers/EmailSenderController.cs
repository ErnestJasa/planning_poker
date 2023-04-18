using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlanningPokerAPI.Dto;
using PlanningPokerAPI.Interfaces;

namespace PlanningPokerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSenderController : ControllerBase
    {
        private readonly IEmailSenderRepository _emailSenderRepository;
        public EmailSenderController(IEmailSenderRepository emailSenderRepository)
        {
            _emailSenderRepository = emailSenderRepository;
        }
        [HttpPost]
        public IActionResult SendEmail(EmailDto emailDto)
        {
            _emailSenderRepository.SendEmail(emailDto.Email, emailDto.Link);
            return Ok();
        }
    }
}
