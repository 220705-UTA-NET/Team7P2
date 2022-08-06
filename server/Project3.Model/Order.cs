﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project3.Model
{
    /*
     * Object representation of a order made by a customer.
     * 
     * @author Ellery R. De Jesus, Derick
     * @version 8-05-2022
     */
    public class Order
    {
        // The ID of the order
        public int Order_ID { get; set; }
        // The ID of the customer who made the order
        public int Customer_ID { get; set; }
        // The date that the order was made
        public string Order_Date { get; set; }
        public int Jewelry_ID { get; set; }
        public int Item_ID { get; set; }

        public Order(int order_ID, int customer_ID, string order_Date, int jewelry_ID, int item_ID)
        {
            Order_ID = order_ID;
            Customer_ID = customer_ID;
            Order_Date = order_Date;
            Jewelry_ID = jewelry_ID;
            Item_ID = item_ID;
        }
    }
}