namespace JewelryStore
{
    public class Review
    {
        public int id { get; set; }
        public int jewelry_id { get; set; }
        public int customer_id  { get; set; }
        public string? content { get; set; }
        public int? rating { get; set; }
        
        public Review() { }

        public Review(int id, int jewelry_id, int customer_id, string? content, int? rating)
        {
            this.id = id;
            this.jewelry_id = jewelry_id;
            this.customer_id = customer_id;
            this.content = content;
            this.rating = rating;
        }
    }
}
