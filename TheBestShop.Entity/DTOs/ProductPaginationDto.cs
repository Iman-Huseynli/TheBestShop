using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;
using TheBestShop.Entity.Concrete;

namespace TheBestShop.Entity.DTOs
{
    public class ProductPaginationDto: IDto
    {
        public List<Product> Products { get; set; }
        public decimal PaginationCount { get; set; }
        public int ProductsCount { get; set; }
    }
}
