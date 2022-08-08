using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project3.Model
{
    /*
     * Object representation of a Review on our site.
     * 
     * @author Derick Xie, Ellery De Jesus
     * @version 8-05-2022
     */
    public class Jewelry
    {
        // Product ID
        public int id { get; set; }
        // Name of the product
        public string name { get; set; }
        // The pricing of the product
        public decimal price { get; set; }
        // What material the product is made of
        public string material { get; set; }
        // What type of jewelry the product is (i.e. Is it a necklace, ring , etc.)
        public string type { get; set; }

        public Jewelry() { }

        public Jewelry(int id, string name, decimal price, string material, string type)
        {
            this.id = id;
            this.name = name;
            this.material = material;
            this.type = type;
            this.price = price;
        }
    }
}
