using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.Data;
using Project3.Model;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly ILogger<StoreController> _logger;
        private readonly IRepository _repo;

        public StoreController(ILogger<StoreController> logger, IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("/store")]
        public async Task<ActionResult<List<Jewelry>>> GetJewelryList()
        {
            List<Jewelry> list = new List<Jewelry>();
            try
            {
                list = await _repo.ListJewelry();
                _logger.LogInformation("Retrieving Jewelry List ...");
            }catch(Exception e)
            {
                // Minor error checking for now
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
            return list;
        }

        [HttpGet("/store{product_id}")]
        public async Task<ActionResult<Jewelry>> GetJewelry([FromRoute]int product_id)
        {
            Jewelry jewelry;
            try
            {
                jewelry = await _repo.GetJewelry(product_id);
                _logger.LogInformation($"Getting Jewelry #{product_id} ...");

            }catch(Exception e)
            {
                // Minor error checking for now
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
            return jewelry;
        }
    }
}
