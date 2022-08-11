using Project3.Model;

namespace Project3.Data
{
    /*
     * Interface for classes who's job is to read from a database and output data needed for the client side.
     * 
     * @author Ellery R. De Jesus, Derick Xie
     * @version 8-6-2022
     */
    public interface IRepository
    {
        // Returns a list of Jewelry on the store
        public Task<List<Jewelry>> ListJewelry();
        // Returns a list of Jewelry based on a filter
        public Task<List<Jewelry>> ListFilteredJewelry(string filter, string value);
        // Returns data pertaining to one of the jewelries
        public Task<Jewelry> GetJewelry(int ItemID);
        // Returns a list of reviews for one of the jewelries
        public Task<List<Review>> GetProductReviews(int ItemID);
        // Returns a list of reviews that has been made by one of the customers
        public Task<List<Review>> GetCustomerReviews(int CustomerID);
        // Creates a review to be added to the database
        public Task AddReview(Review review);
        // Returns the profile information for a customer
        public Task<Customer> GetCustomer(int CustomerID);
        // Modifies a field within the customer's profile (For now just Shipping Address)
        public Task ModifyCustomerProfile(int CustomerID, string field, string value);
        // Creates a customer to be added to the database
        public Task AddCustomer(Customer customer);
        // Creates a order containing the jewelry to be bought, the buyer's id, and the date in which the order was made
        public Task MakePurchase(int CustomerID, int ProductID);
        // Lists the purchases that a customer has made
        public Task<List<Order>> ListOrders(int CustomerID);
        // Retrieve the Customer with the specified Username
        public Task<int> LogInCustomer(string Username, string Password);
        // Creates a customer with the specified username
        public Task<Customer> RegisterCustomer(string Username, string Password);



    }
}
