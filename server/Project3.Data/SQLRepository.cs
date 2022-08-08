using Microsoft.Extensions.Logging;
using Project3.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
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
        public async Task<List<Jewelry>> ListJewelry() {
            List<Jewelry> jewelry = new List<Jewelry>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Jewelry;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            using SqlDataReader reader = cmd.ExecuteReader();

            Jewelry NewJewelry;
            while (await reader.ReadAsync())
            {
                NewJewelry = new Jewelry(reader.GetInt32(0), reader.GetString(1), (decimal)reader.GetFloat(2),
                                         reader.GetString(3), reader.GetString(4));
                jewelry.Add(NewJewelry);
            }

            await connection.CloseAsync();
            return jewelry;

        }
        public async Task<Jewelry> GetJewelry(int ItemID) {
            return new Jewelry();
        }
        public async Task<List<Review>> GetProductReviews(int ItemID) {
            List<Review> reviews = new List<Review>();
            return reviews;
        }
        public async Task<List<Review>> GetCustomerReviews(int CustomerID) {
            List<Review> reviews = new List<Review>();
            return reviews;
        }
        public async Task AddReview(Review review) { }
        public async Task<Customer> GetCustomer(int CustomerID) {
            Customer customer = new Customer();
            return customer;
        }
        public async Task<Customer> ModifyCustomerProfile(int CustomerID, string field, string value) {
            Customer customer = new Customer();
            return customer;
        }
        public async Task<Customer> AddCustomer(Customer customer) {
            return customer;
        }
        public async Task<Order> MakePurchase(int CustomerID, int ProductID) {
            Order order = new Order();
            return order;
        }
        public async Task<List<Order>> ListOrders(int CustomerID) {
            List<Order> orders = new List<Order>();
            return orders;
        }
    }
}
