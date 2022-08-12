using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.Data;
using Project3.Model;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<OrdersController> _logger;
        private readonly IRepository _repo;

        public OrdersController(ILogger<OrdersController> logger, IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("/orders{user_id}")]
        public async Task<ActionResult<List<Order>>> ListOrders([FromRoute]int user_id)
        {
            List<Order> orders;
            
            try
            {

                orders = await _repo.ListOrders(user_id);
                _logger.LogInformation($"Giving list of orders for user #{user_id} ...");
            }catch(Exception e)
            {
                // Minor error checking for now
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }

            return orders;
        }

        [HttpPost("/orders{product_id}")]
        public async Task<ActionResult<Order>> MakePurchase( int customer_id)
        {
            try
            {
                await _repo.MakePurchase(customer_id);
                _logger.LogInformation($"Customer #{customer_id} purchased Product # ...");
                return StatusCode(201);
            }catch(Exception e)
            {
                // Minor error checking for now
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
        }
    }
}
