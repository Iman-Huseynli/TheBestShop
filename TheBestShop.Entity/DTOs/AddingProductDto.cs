using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.DTOs
{
    public class AddingProductDto: IDto
    {
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Price { get; set; }
        public string Quantity { get; set; }
        public string Weight { get; set; }
        public List<string> CategoryIds { get; set; }
    }
}
