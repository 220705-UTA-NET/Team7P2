namespace JewelryStore
{
    public class Customer
    {
        public int id { get; set; }
        public string name { get; set; }
        public string shipping_address { get; set; }
        
        public Customer() { }

        public Customer(int id, string name, string shipping_address)
        {
            this.id = id;
            this.name = name;
            this.shipping_address = shipping_address;
        }
    }
}