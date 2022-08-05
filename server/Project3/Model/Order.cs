namespace JewelryStore
{
    public class Order
    {
        public int id { get; set; }
        public int jewelry_id { get; set; }
        public int customer_id  { get; set; }
        public Order() { }

        public Order(int id, int jewelry_id, int customer_id)
        {
            this.id = id;
            this.jewelry_id = jewelry_id;
            this.customer_id = customer_id;
        }
    }
}