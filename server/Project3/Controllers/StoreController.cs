﻿using Microsoft.AspNetCore.Http;
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
                _logger.LogInformation("Sending Jewelry List...");
            }catch(Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500);
            }
            return list;
        }
    }
}