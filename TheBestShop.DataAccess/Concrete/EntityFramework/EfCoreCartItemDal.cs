using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess.EntityFramework;
using TheBestShop.DataAccess.Abstract;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.DataAccess.Concrete.EntityFramework
{
    public class EfCoreCartItemDal : EfRepositoryBase<CartItem, TheBestShopContext>, ICartItemDal
    {
        public List<Product> GetCartsDetails(List<CartItemDto> carts)
        {
            using (var context = new TheBestShopContext())
            {
                var productIdList = new List<int>();
                carts.ForEach(c => productIdList.Add(c.ProductId));
                var product = context.Products.AsQueryable<Product>().Where(c => productIdList.Contains(c.Id)).ToList();
                return product;
            }
        }
    }
}
