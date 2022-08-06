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
     * @author Ellery R. De Jesus, Derick
     * @version 8-05-2022
     */
    public class Jewelry
    {
        // Product ID
        public int Item_ID { get; set; }
        // Name of the product
        public string Item_Name { get; set; }
        // The pricing of the product
        public decimal Price { get; set; }
        // What material the product is made of
        public string Material { get; set; }
        // What type of jewelry the product is (i.e. Is it a necklace, ring , etc.)
        public string Item_Type { get; set; }

        public Jewelry() { }
    }
}
