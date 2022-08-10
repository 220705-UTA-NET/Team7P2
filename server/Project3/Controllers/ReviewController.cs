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
    public class ReviewController : ControllerBase
    {
        private readonly ILogger<ReviewController> _logger;
        private readonly IRepository _repo;

        public ReviewController(ILogger<ReviewController> logger, IRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet("/review/item/{ItemID}")]
        public async Task<ActionResult<List<Review>>> GetProductReviews([FromRoute] int ItemID)
        {
            List<Review> list = new List<Review>();
            try
            {
                list = await _repo.GetProductReviews(ItemID);
                _logger.LogInformation("Sending Review List from ItemID...");
            }catch(Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
            return list;
        }

        [HttpGet("/review/customer/{CustomerID}")]
        public async Task<ActionResult<List<Review>>> GetCustomerReviews([FromRoute] int CustomerID)
        {
            List<Review> list = new List<Review>();
            try
            {
                list = await _repo.GetProductReviews(CustomerID);
                _logger.LogInformation("Sending Review List from CustomerID...");
            }catch(Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
            return list;
        }

        [HttpPost("/review/{ProductID}/{CustomerID}")]
        public async Task<ActionResult<Review>> AddReview(Review review)
        {
            try
            {
                await _repo.AddReview(review);
                _logger.LogInformation("Adding Review...");
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