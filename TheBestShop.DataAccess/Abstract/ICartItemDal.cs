using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheBestShop.Core.DataAccess;
using TheBestShop.Entity.Concrete;
using TheBestShop.Entity.DTOs;

namespace TheBestShop.DataAccess.Abstract
{
    public interface ICartItemDal : IEntityRepository<CartItem>
    {
        List<Product> GetCartsDetails(List<CartItemDto> carts);
    }
}
