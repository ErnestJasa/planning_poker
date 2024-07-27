using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlanningPokerAPI.Interfaces;


// changes in branch testing/test
namespace PlanningPokerAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ConnectedUserController : ControllerBase
	{
		private readonly IConnectedUserRepository _connectedUserRepository;
		public ConnectedUserController(IConnectedUserRepository connectedUserRepository)
		{
			_connectedUserRepository = connectedUserRepository;
		}
		[HttpGet("connectedUsers")]
		public IActionResult GetConnectedUsers()
		{
			return Ok(_connectedUserRepository.GetConnectedUsers());
		}
	}
}
