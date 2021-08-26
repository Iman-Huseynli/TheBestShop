using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.Concrete
{
    public class CartItem : IEntity
    {
        public int Id { get; set; }
        public DateTime? CreateDate { get; set; }

        public Cart Cart { get; set; }
        public int CartId { get; set; }

        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}
