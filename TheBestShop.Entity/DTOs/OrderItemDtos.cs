using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.Entity.DTOs
{
    public class OrderItemDtos : IDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Quantity { get; set; }
    }
}
