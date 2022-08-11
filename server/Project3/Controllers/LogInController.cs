using Basic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Project3.Data;
using Project3.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
        public async Task<ActionResult<Dictionary<string, string>>> LogIn()
        {
            int customerId;
            try
            {
                // Basic Authentication For Now.
                string Info = Request.Headers.Authorization;
                string EString = Info.Split(' ')[1];

                byte[] data = Convert.FromBase64String(EString);
                string DString = Encoding.UTF8.GetString(data);

                string[] cred = DString.Split(':');

                customerId = await _repo.LogInCustomer(cred[0], cred[1]);

                if (customerId != 0) {

                    // May just re-direct to a different endpoint
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, $"{customerId}")
                    };

                    var secretBytes = Encoding.UTF8.GetBytes(Constants.Secret);
                    var key = new SymmetricSecurityKey(secretBytes);
                    var algorithm = SecurityAlgorithms.HmacSha256;

                    var signingCredentials = new SigningCredentials(key, algorithm);
                    var token = new JwtSecurityToken(
                        Constants.Issuer,
                        Constants.Audience,
                        claims,
                        DateTime.Now,
                        // For now, the token will last for a day. Once refresh tokens are included, this will be shorten down.
                        DateTime.Now.AddDays(1),
                        signingCredentials
                        );
                    var tokenJson = new JwtSecurityTokenHandler().WriteToken(token);
                    Dictionary<string, string> response = new Dictionary<string, string>();
                    response.Add("CustomerID", $"{customerId}");
                    response.Add("Access-Token", tokenJson);

                    return response;
                }
                else
                {
                    _logger.LogError("Failed sign-in attempt ...");
                    return StatusCode(401);
                }

            }catch(Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
           
        }

    }
}
