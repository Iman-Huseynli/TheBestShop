using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.Concrete
{
    public class Cart : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public List<CartItem> CartItems { get; set; }
    }
}
