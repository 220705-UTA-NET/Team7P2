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

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

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
            Jewelry jewelry = new Jewelry();
            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Jewelry WHERE Item_ID=@ItemID;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@ItemID", ItemID);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();
            if(await reader.ReadAsync())
            {
                jewelry.id = reader.GetInt32(0);
                jewelry.name = reader.GetString(1);
                jewelry.price = (decimal)reader.GetFloat(2);
                jewelry.material = reader.GetString(3);
                jewelry.type = reader.GetString(4);
            }

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

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = @"";

            return order;
        }
        public async Task<List<Order>> ListOrders(int CustomerID) {
            List<Order> orders = new List<Order>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = @"
                             SELECT * FROM Orders 
                             JOIN J_T ON Orders.Customer_ID=J_T.Customers_ID
                             WHERE Customer_ID = @customer_id;
                             ";

            SqlCommand cmd = new SqlCommand(cmdText, connection);
            cmd.Parameters.AddWithValue("@customer_id", CustomerID);

            using SqlDataReader reader = cmd.ExecuteReader();

            while(await reader.ReadAsync())
            {
                orders.Add(new Order(reader.GetInt32(0), reader.GetInt32(1), reader.GetDateTime(2), reader.GetInt32(6)));
            }

            return orders;
        }

        public async Task<Customer> LogInCustomer(string Username, string Password)
        {
            Customer customer = new Customer();
            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();
            string cmdText = @"SELECT CU.Customer_ID, CName, Shipping_address FROM Customers AS CU
                           JOIN Cred AS CR ON CU.Customer_ID=CR.Customer_ID
                           WHERE userN=@Username AND Pass=@Password";

            SqlCommand cmd = new SqlCommand(cmdText, connection);
            cmd.Parameters.AddWithValue("@Username", Username);
            cmd.Parameters.AddWithValue("@Password", Password);

            using SqlDataReader reader = cmd.ExecuteReader();

            if (await reader.ReadAsync()) customer = new Customer(reader.GetInt32(0), reader.GetString(1), reader.GetString(2));

            return customer;
        }
    }
}
