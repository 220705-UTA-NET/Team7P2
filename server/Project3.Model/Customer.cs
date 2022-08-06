namespace Project3.Model
{
    /*
     * Object representation of a Customer that uses our site.
     * 
     * @author Ellery R. De Jesus, Derick
     * @version 8-05-2022
     */


    public class Customer
    {
        // The customer's ID
        public int Customers_ID { get; set; }
        // The customer's name
        public string CName { get; set; }
        // The customer's shipping address
        public string Shipping_address { get; set; }

        public Customer() { }
    }
}