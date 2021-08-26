using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.Entities;

namespace TheBestShop.Entity.Concrete
{
    public class Product : IEntity
    {
        public Product()
        {
            ProductsCategories = new List<ProductCategories>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string CompanyName { get; set; }
        public string Quality { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageId { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }
        public bool Availability { get; set; }
        public decimal Weight { get; set; }
        public string CreateUser { get; set; }
        public DateTime? CreateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? UpdateDate { get; set; }

        public List<ProductCategories> ProductsCategories { get; set; }
        public List<CartItem> CartItems { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
