using Microsoft.Extensions.Logging;
using Project3.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project3.Data
{
    /*
     * Reads from the database located at the string url provided during instantiation, so that
     * it may be sent to the client.
     * 
     * @author Ellery R. De Jesus, Derick Xie
     * @version 8-6-2022
     * @See 'IRepository.cs' for information regarding the methods
     */
    public class SQLRepository : IRepository
    {
        // URL of the Database being used
        private readonly string _ConnectionString;
        // Something to log the actions of our API
        private readonly ILogger<SQLRepository> _logger;

        public SQLRepository(string connectionString, ILogger<SQLRepository> logger)
        {
            _ConnectionString = connectionString;
            _logger = logger;
        }
        public Task<List<Jewelry>> ListJewelry() { }
        public Task<Jewelry> GetJewelry(int ItemID) { }
        public Task<List<Review>> GetProductReviews(int ItemID) { }
        public Task<List<Review>> GetCustomerReviews(int CustomerID) { }
        public Task AddReview(Review review) { }
        public Task<Customer> GetCustomer(int CustomerID) { }
        public Task<Customer> ModifyUserProfile(string field, string value) { }
        public Task<Order> MakePurchase(int CustomerID, int ProductID) { }
        public Task<List<Order>> ListOrders(int CustomerID) { }
    }
}
