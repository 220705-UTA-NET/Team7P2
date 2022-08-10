using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project3.Data;
using Project3.Model;
using System.Text;

namespace Project3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogInController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly IRepository _repo;

        public LogInController(ILogger<CustomerController> logger, IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("/login")]
        public async Task<ActionResult<Customer>> LogIn()
        {
            Customer customer;
            try
            {
                // Basic Authentication For Now.
                string Info = Request.Headers.Authorization;
                string EString = Info.Split(' ')[1];

                byte[] data = Convert.FromBase64String(EString);
                string DString = Encoding.UTF8.GetString(data);

                string[] cred = DString.Split(':');

                customer = await _repo.LogInCustomer(cred[0], cred[1]);

            }catch(Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
            return customer;
            
        }

    }
}
