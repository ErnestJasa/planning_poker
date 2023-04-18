using Microsoft.AspNetCore.Mvc;
using PlanningPokerAPI.Models;

namespace PlanningPokerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomCardConfigController : ControllerBase
    {
        //private static List<CardConfig> cards = new List<CardConfig>
        //{
        //    new CardConfig { ConfigRoom = "initial", Value = "[{\"id\":1,\"name\":\"0\",\"checked\":false},{\"id\":2,\"name\":\"1/2\",\"checked\":true},{\"id\":3,\"name\":\"1\",\"checked\":true},{\"id\":4,\"name\":\"2\",\"checked\":true},{\"id\":5,\"name\":\"3\",\"checked\":true},{\"id\":6,\"name\":\"5\",\"checked\":false},{\"id\":7,\"name\":\"8\",\"checked\":true},{\"id\":8,\"name\":\"13\",\"checked\":true},{\"id\":9,\"name\":\"20\",\"checked\":true},{\"id\":10,\"name\":\"40\",\"checked\":true},{\"id\":11,\"name\":\"100\",\"checked\":true},{\"id\":12,\"name\":\"?\",\"checked\":false},{\"id\":13,\"name\":\"Coffee\",\"checked\":true}]"}
        //};
        private readonly DataContext _context;

        public RoomCardConfigController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("get")]
        public async Task<ActionResult<List<RoomCardConfig>>> Get()
        {
            return Ok(await _context.RoomConfigTable.ToListAsync());
        }

        [HttpGet("{configRoom}")]
        public async Task<ActionResult<RoomCardConfig>> Get(string configRoom)
        {
            var dbcard = await _context.RoomConfigTable.FindAsync(configRoom);
            if (dbcard == null)
                return BadRequest("No Config");
            return Ok(dbcard);
        }

        [HttpPost]
        public async Task<ActionResult<List<RoomCardConfig>>> AddConfig(RoomCardConfig dbcard)
        {
            _context.RoomConfigTable.Add(dbcard);
            await _context.SaveChangesAsync();
            return Ok(await _context.RoomConfigTable.ToListAsync());
        }

        [HttpPut("put")]
        public async Task<ActionResult<List<RoomCardConfig>>> UpdateConfig(RoomCardConfig request)
        {
            var dbcard = await _context.RoomConfigTable.FindAsync(request.ConfigRoom);
            if (dbcard == null)
                return BadRequest("Card not found");
            dbcard.Value = request.Value;

            await _context.SaveChangesAsync();
            return Ok(await _context.RoomConfigTable.ToListAsync());
        }

    }
}