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
    public class Review
    {
        // Id of the review
        public int Reviews_ID { get; set; }
        // Id of the customer who wrote the review
        public int Customer_ID { get; set; }
        // Id of the item purchased
        public int Item_ID { get; set; }
        // The review itself, should the customer write one
        public string? Content { get; set; }
        // The rating of the item purchased made by the customer, should they rate their purchase
        public byte? Rating { get; set; }
        // The date of the review. 
        public string Review_Date { get; set; }

        public Review(int reviews_ID, int customer_ID, int item_ID, string? content, byte? rating, string review_Date)
        {
            Reviews_ID = reviews_ID;
            Customer_ID = customer_ID;
            Item_ID = item_ID;
            Content = content;
            Rating = rating;
            Review_Date = review_Date;
        }
    }
}
