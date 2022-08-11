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
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly IRepository _repo;

        public CustomerController(ILogger<CustomerController> logger, IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("/customer/{CustomerID}")]
        public async Task<ActionResult<Customer>> GetCustomer([FromRoute] int CustomerID)
        {
            Customer customer;

            try
            {
                customer = await _repo.GetCustomer(CustomerID);
                _logger.LogInformation("Sending Customer...");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }

            return customer;
        }

        [HttpPut("/customer/{CustomerID}")]
        public async Task<ActionResult<Customer>> ModifyCustomerProfile([FromRoute] int CustomerID, string field, string value)
        {
            try
            {
                await _repo.ModifyCustomerProfile(CustomerID, field, value);
                _logger.LogInformation("Modifying Customer...");
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }

        [HttpPost("/customer")]
        public async Task<ActionResult<Customer>> AddCustomer(Customer customer, string username, string password)
        {
            try
            {
                await _repo.AddCustomer(customer, username, password);
                _logger.LogInformation("Adding Customer...");
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(500);
            }
        }
    }
}
