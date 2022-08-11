﻿using Microsoft.Extensions.Logging;
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
                NewJewelry = new Jewelry(reader.GetInt32(0), reader.GetString(1), reader.GetDouble(2),
                                         reader.GetString(3), reader.GetString(4), reader.IsDBNull(5) ? "" : reader.GetString(5));
                jewelry.Add(NewJewelry);
            }

            await connection.CloseAsync();
            
            _logger.LogInformation("Executed ListJewelry, returned {0} results", jewelry.Count);

            return jewelry;

        }

        public async Task<List<Jewelry>> ListFilteredJewelry(string filter, string value) {
            List<Jewelry> jewelry = new List<Jewelry>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "";

            switch (filter)
            {
                case "Material":
                    cmdText = "SELECT * FROM Jewelry WHERE Material = @Value;";
                    break;
                case "item_Type":
                    cmdText = "SELECT * FROM Jewelry WHERE item_Type = @Value;";
                    break;
            }

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Value", value);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            Jewelry NewJewelry;
            while (await reader.ReadAsync())
            {
                NewJewelry = new Jewelry(reader.GetInt32(0), reader.GetString(1), reader.GetDouble(2),
                                         reader.GetString(3), reader.GetString(4), reader.GetString(5));
                jewelry.Add(NewJewelry);
            }

            await connection.CloseAsync();
            
            _logger.LogInformation("Executed ListFilteredJewelry, returned {0} results", jewelry.Count);

            return jewelry;
        }

        public async Task<Jewelry> GetJewelry(int ItemID) {
            Jewelry jewelry = new Jewelry();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Jewelry WHERE Item_ID = @Item_ID;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Item_ID", ItemID);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                jewelry = new Jewelry(reader.GetInt32(0), reader.GetString(1), reader.GetDouble(2),
                                      reader.GetString(3), reader.GetString(4), reader.IsDBNull(5) ? "" : reader.GetString(5));
            }

            _logger.LogInformation("Executed GetJewelry");

            return jewelry;
        }
        public async Task<List<Review>> GetProductReviews(int ItemID) {
            List<Review> reviews = new List<Review>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Reviews WHERE Item_ID = @Item_ID;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Item_ID", ItemID);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            Review NewReview;
            while (await reader.ReadAsync())
            {
                NewReview = new Review(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2),
                                       reader.GetDateTime(3), reader.IsDBNull(4) ? "" : reader.GetString(4), reader.GetByte(5));
                reviews.Add(NewReview);
            }

            await connection.CloseAsync();
            
            _logger.LogInformation("Executed GetProductReviews, returned {0} results", reviews.Count);

            return reviews;
        }

        public async Task<List<Review>> GetCustomerReviews(int CustomerID) {
            List<Review> reviews = new List<Review>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Reviews WHERE Customer_ID = @Customer_ID;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Customer_ID", CustomerID);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            Review NewReview;
            while (await reader.ReadAsync())
            {
                NewReview = new Review(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2),
                                       reader.GetDateTime(3), reader.IsDBNull(4) ? "" : reader.GetString(4),  reader.GetByte(5));
                reviews.Add(NewReview);
            }

            await connection.CloseAsync();
            
            _logger.LogInformation("Executed GetCustomerReviews, returned {0} results", reviews.Count);

            return reviews;
        }
        public async Task AddReview(Review review) { 
            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText =
            @"INSERT INTO Reviews (Customer_ID, Item_ID, Review_date, content, rating)
            VALUES
            (@Customer_ID, @Item_ID, @Review_date, @content, @rating)";

            using SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Customer_ID", review.customer_id);
            cmd.Parameters.AddWithValue("@Item_ID", review.jewelry_id);
            cmd.Parameters.AddWithValue("@Review_date", review.review_date);
            cmd.Parameters.AddWithValue("@content", review.content);
            cmd.Parameters.AddWithValue("@rating", review.rating);

            await cmd.ExecuteNonQueryAsync();

            await connection.CloseAsync();

            _logger.LogInformation("Executed AddReview");
        }
        public async Task<Customer> GetCustomer(int CustomerID) {
            Customer customer = new Customer();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Customers WHERE Customer_ID = @Customer_ID;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Customer_ID", CustomerID);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                customer = new Customer(reader.GetInt32(0), reader.GetString(1), reader.GetString(2));
            }

            _logger.LogInformation("Executed GetCustomer");

            return customer;
        }
        public async Task ModifyCustomerProfile(int CustomerID, string field, string value) {
            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "UPDATE Customers SET @field = @value WHERE Customer_ID = @Customer_ID";

            using SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@field", field);
            cmd.Parameters.AddWithValue("@value", value);
            cmd.Parameters.AddWithValue("@Customer_ID", CustomerID);

            await cmd.ExecuteNonQueryAsync();

            await connection.CloseAsync();

            _logger.LogInformation("Executed ModifyCustomerProfile");
        }
        public async Task AddCustomer(Customer customer) {
            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText =
            @"INSERT INTO Customers (CName, Shipping_address)
            VALUES
            (@CName, @Shipping_address)";

            using SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@CName", customer.name);
            cmd.Parameters.AddWithValue("@Shipping_address", customer.shipping_address);

            await cmd.ExecuteNonQueryAsync();

            await connection.CloseAsync();

            _logger.LogInformation("Executed AddCustomer");
        }
        public async Task MakePurchase(int CustomerID)
        {
            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText =
            @"INSERT INTO Orders (Customer_ID, Order_Date)
            VALUES
            (@Customer_ID, @Order_Date)";

            using SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("@Customer_ID", CustomerID);
            cmd.Parameters.AddWithValue("@Order_Date", DateTime.Now);
            
            await cmd.ExecuteNonQueryAsync();

            await connection.CloseAsync();

            _logger.LogInformation("Executed MakePurchase");
        }
        public async Task<List<Order>> ListOrders(int CustomerID) {
            List<Order> orders = new List<Order>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM Orders WHERE Customer_ID = @Customer_ID;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            cmd.Parameters.AddWithValue("Customer_ID", CustomerID);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            Order NewOrder;
            while (await reader.ReadAsync())
            {
                NewOrder = new Order(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2),
                                     reader.GetDateTime(3));
                orders.Add(NewOrder);
            }

            await connection.CloseAsync();
            
            _logger.LogInformation("Executed CustomerID, returned {0} results", orders.Count);

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
        public async Task<List<Jewelry_transaction>> ListTransactions()
        {
            List<Jewelry_transaction> transactions = new List<Jewelry_transaction>();

            using SqlConnection connection = new(_ConnectionString);
            await connection.OpenAsync();

            string cmdText = "SELECT * FROM J_T;";

            SqlCommand cmd = new SqlCommand(cmdText, connection);

            using SqlDataReader reader = await cmd.ExecuteReaderAsync();

            Jewelry_transaction NewJewelryTransaction;
            while (await reader.ReadAsync())
            {
                NewJewelryTransaction = new Jewelry_transaction(reader.GetInt32(0), reader.GetInt32(1), reader.GetInt32(2), reader.GetInt32(3));

                transactions.Add(NewJewelryTransaction);
            }

            await connection.CloseAsync();

            _logger.LogInformation("Executed ListTransactions, returned {0} results", transactions.Count);

            return transactions;

        }

    }
}
