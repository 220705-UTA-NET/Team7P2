using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project3.Model
{
    public class Jewelry_transaction
    {
        // transaction ID
        public int id { get; set; }

        public int customer_id { get; set; }

        public int order_id { get; set; }

        public int Item_id { get; set; }

        public Jewelry_transaction() { }

        public Jewelry_transaction(int id, int customer_id, int order_id, int item_id)
        {
            this.id = id;
            this.customer_id = customer_id;
            this.order_id = order_id;
            this.Item_id = item_id;
        }

        public static void Add(Jewelry_transaction newJewelryTransaction)
        {
            throw new NotImplementedException();
        }
    }
}
