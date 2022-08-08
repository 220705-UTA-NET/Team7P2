using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.Data;
using Project3.Model;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ILogger<StoreController> _logger;
        private readonly IRepository _repo;

        public OrdersController(ILogger<StoreController> logger, IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("/orders{user_id}")]
        public async Task<ActionResult<List<Order>>> ListOrders(int user_id)
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

        [HttpPost("/orders{product_id}&{customer_id}")]
        public async Task<ActionResult<Order>> MakePurchase(int product_id, int customer_id)
        {
            Order order;
            try
            {
                order = await _repo.MakePurchase(customer_id, product_id);
                _logger.LogInformation($"Customer #{customer_id} purchased Product #{product_id} ...");
            }catch(Exception e)
            {
                // Minor error checking for now
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }

            return order;
        }
    }
}
