namespace JewelryStore
{
    public class Jewelry
    {
        public int id { get; set; }
        public int price { get; set; }
        public string name { get; set; }
        public string material { get; set; }
        public string type { get; set; }

        public Jewelry() { }

        public Jewelry(int id, string name, string material, string type)
        {
            this.id = id;
            this.name = name;
            this.material = material;
            this.type = type;
        }
    }
}